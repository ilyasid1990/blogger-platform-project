import {type Request, type Response} from 'express';
import { type PostInputDto } from '../../dto/post.input.dto.js';
import { HttpStatus } from '../../../core/constants/http-statuses.js';
import { postsRepository } from '../../repositories/posts.repository.js';

export function updatePostHandler(
        req: Request<{ id: string }, {}, PostInputDto>,
        res: Response,
) {
    // Тело и id уже проверены middleware-валидаторами.
    // Репозиторий вернёт false, если блог с таким id не найден.
    const isUpdated = postsRepository.update(req.params.id, req.body);

    if (!isUpdated) {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    res.sendStatus(HttpStatus.NoContent);
};