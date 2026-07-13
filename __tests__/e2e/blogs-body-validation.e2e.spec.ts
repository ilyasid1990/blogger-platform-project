import request from 'supertest';
import express from 'express';
import { setupApp } from '../../src/setup-app.js';
import { HttpStatus } from '../../src/core/constants/http-statuses.js';
import { type BlogInputDto } from '../../src/blogs/dto/blog.input.dto.js';
import { BLOGS_PATH } from '../../src/blogs/constants/blogs.paths.js';
import { generateBasicAuthToken } from '../utils/generate-admin-auth-token.js';
import { clearDb } from '../utils/clear-db.js';

describe('Blog API body validation check', () => {
    const app = express();
    setupApp(app);

    const adminToken = generateBasicAuthToken();

    const correctTestBlogData: BlogInputDto = {
        name: "IT-Incubator Tech Blog",
        description: "Статьи о Веб-разработке на Node.js",
        websiteUrl: "https://it-incubator.io",
    };

    beforeAll(async () => {
        await clearDb(app);
    });

    it('❌ should return 401 without auth; POST /blogs', async () => {
        await request(app)
                .post(BLOGS_PATH)
                .send(correctTestBlogData)
                .expect(HttpStatus.Unauthorized);
    });

    it(`❌ should not create blog when incorrect body passed; POST /blogs`, async () => {
        const invalidDataSet1 = await request(app)
                .post(BLOGS_PATH)
                .set('Authorization', adminToken)
                .send({
                    ...correctTestBlogData,
                    name: 5,
                    description: 10,
                    websiteUrl: 'invalid websiteUrl',
                })
                .expect(HttpStatus.BadRequest);

        expect(invalidDataSet1.body.errorMessages).toHaveLength(3);


        // check что никто не создался
        const blogListResponse = await request(app)
                .get(BLOGS_PATH)
                .set('Authorization', adminToken);
        expect(blogListResponse.body).toHaveLength(0);
    });

    it('❌ should not update blog when incorrect data passed; PUT /blogs/:id', async () => {
        const {
            body: { id: createdBlogId },
        } = await request(app)
                .post(BLOGS_PATH)
                .set('Authorization', adminToken)
                .send({ ...correctTestBlogData })
                .expect(HttpStatus.Created);

        const invalidDataSet1 = await request(app)
                .put(`${BLOGS_PATH}/${createdBlogId}`)
                .set('Authorization', adminToken)
                .send({
                    ...correctTestBlogData,
                    name: 5,
                    description: true,
                    websiteUrl: 'invalid websiteUrl',
                })
                .expect(HttpStatus.BadRequest);

        expect(invalidDataSet1.body.errorMessages).toHaveLength(3);



        const driverResponse = await request(app)
                .get(`${DRIVERS_PATH}/${createdDriverId}`)
                .set('Authorization', adminToken);

        expect(driverResponse.body).toEqual({
            ...correctTestDriverData,
            id: createdDriverId,
            createdAt: expect.any(String),
        });
    });

});