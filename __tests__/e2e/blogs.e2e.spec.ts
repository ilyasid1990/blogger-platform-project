import request from 'supertest';
import express from 'express';
import { setupApp } from '../../src/setup-app.js';
import { HttpStatus } from '../../src/core/constants/http-statuses.js';
import { type BlogInputDto } from '../../src/blogs/dto/blog.input.dto.js';
import { BLOGS_PATH } from '../../src/blogs/constants/blogs.paths.js';
import { generateBasicAuthToken } from '../utils/generate-admin-auth-token.js';
import { clearDb } from '../utils/clear-db.js';

describe('Blog API', () => {
    const app = express();
    setupApp(app);

    const adminToken = generateBasicAuthToken();

    const testBlogData: BlogInputDto = {
        name: "IT-Incubator Tech Blog",
        description: "Статьи о backend-разработке и TypeScript",
        websiteUrl: "https://it-incubator.io",
    };

    beforeAll(async () => {
        await clearDb(app);
    });

    it('✅ should create blog; POST /blogs', async () => {
        const newBlog: BlogInputDto = {
            ...testBlogData,
            name: "IT-Incubator Tech Blog",
            description: "Статьи о backend-разработке и TypeScript",
            websiteUrl: "https://it-incubator.io",
        };

        await request(app)
                .post(BLOGS_PATH)
                .set('Authorization', adminToken)
                .send(newBlog)
                .expect(HttpStatus.Created);
    });

    it('✅ should return drivers list; GET /blogs', async () => {
        await request(app)
                .post(BLOGS_PATH)
                .set('Authorization', adminToken)
                .send({ ...testBlogData, name: 'Another Blog' })
                .expect(HttpStatus.Created);

        await request(app)
                .post(BLOGS_PATH)
                .set('Authorization', adminToken)
                .send({ ...testBlogData, name: 'Another Blog2' })
                .expect(HttpStatus.Created);

        const blogListResponse = await request(app)
                .get(BLOGS_PATH)
                .set('Authorization', adminToken)
                .expect(HttpStatus.Ok);

        expect(blogListResponse.body).toBeInstanceOf(Array);
        expect(blogListResponse.body.length).toBeGreaterThanOrEqual(2);
    });

    it('✅ should return driver by id; GET /blogs/:id', async () => {
        const createResponse = await request(app)
                .post(BLOGS_PATH)
                .set('Authorization', adminToken)
                .send({ ...testBlogData, name: 'Another Blog' })
                .expect(HttpStatus.Created);

        const getResponse = await request(app)
                .get(`${BLOGS_PATH}/${createResponse.body.id}`)
                .set('Authorization', adminToken)
                .expect(HttpStatus.Ok);

        expect(getResponse.body).toEqual({
            ...createResponse.body,
            id: expect.any(Number),
        });
    });

    it('✅ should update driver; PUT /blogs/:id', async () => {
        const createResponse = await request(app)
                .post(BLOGS_PATH)
                .set('Authorization', adminToken)
                .send({ ...testBlogData, name: 'Another Blog' })
                .expect(HttpStatus.Created);

        const blogUpdateData: BlogInputDto = {
            ...testBlogData,
            name: "IT-Incubator Tech Blog",
            description: "Статьи о backend-разработке и TypeScript",
            websiteUrl: "https://it-incubator.io",
        };

        await request(app)
                .put(`${BLOGS_PATH}/${createResponse.body.id}`)
                .set('Authorization', adminToken)
                .send(blogUpdateData)
                .expect(HttpStatus.NoContent);

        const blogResponse = await request(app)
                .get(`${BLOGS_PATH}/${createResponse.body.id}`)
                .set('Authorization', adminToken);

        expect(blogResponse.body).toEqual({
            ...blogUpdateData,
            id: createResponse.body.id,
        });
    });

    it(`✅ DELETE /blogs/:id and check after NOT FOUND`, async () => {
        const res = await request(app)
                .post(BLOGS_PATH)
                .set('Authorization', adminToken)
                .send({ ...testBlogData, name: 'Another Blog' })
                .expect(HttpStatus.Created);

        await request(app)
                .delete(`${BLOGS_PATH}/${res.body.id}`)
                .set('Authorization', adminToken)
                .expect(HttpStatus.NoContent);

        await request(app)
                .get(`${BLOGS_PATH}/${res.body.id}`)
                .set('Authorization', adminToken)
                .expect(HttpStatus.NotFound);
    });
});