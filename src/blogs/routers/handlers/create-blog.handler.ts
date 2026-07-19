import { type Request, type Response } from 'express';
import { type BlogInputDto } from '../../dto/blog.input.dto.js';
import { HttpStatus } from '../../../core/constants/http-statuses.js';
import { type Blog } from '../../types/blog.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util.js';

export async function createBlogHandler(
  req: Request<{}, {}, BlogInputDto>,
  res: Response,
) {
    try {
        // Проекция DTO -> доменная модель; дату создания добавляем здесь.
        const newBlog: Blog = {
            ...req.body,
            createdAt: new Date().toISOString(),
            isMembership: true,
        };

        const createdBlog = await blogsRepository.create(newBlog);
        const blogViewModel = mapToBlogViewModel(createdBlog);
        res.status(HttpStatus.Created).send(blogViewModel);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }
};