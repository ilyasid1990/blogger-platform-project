import { type Request, type Response } from 'express';
import { type BlogInputDto } from '../../dto/blog.input.dto.js';
import { HttpStatus } from '../../../core/constants/http-statuses.js';
import { type Blog } from '../../types/blog.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';

export function createBlogHandler(
        req: Request<{}, {}, BlogInputDto>,
        res: Response,
) {
    // Тело запроса уже проверено middleware-валидаторами, поэтому здесь только создаём.
    const newBlog: Omit<Blog, 'id'> = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    };

    const createdBlog = blogsRepository.create(newBlog);
    res.status(HttpStatus.Created).send(createdBlog);
};