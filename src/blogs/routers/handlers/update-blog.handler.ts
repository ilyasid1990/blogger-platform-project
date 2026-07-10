import {type Request, type Response} from 'express';
import { type BlogInputDto } from '../../dto/blog.input.dto.js';
import { HttpStatus } from '../../../core/constants/http-statuses.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';

export function updateBlogHandler(
        req: Request<{ id: string }, {}, BlogInputDto>,
        res: Response,
) {
    // Тело и id уже проверены middleware-валидаторами.
    // Репозиторий вернёт false, если блог с таким id не найден.
    const isUpdated = blogsRepository.update(req.params.id, req.body);

    if (!isUpdated) {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    res.sendStatus(HttpStatus.NoContent);
};