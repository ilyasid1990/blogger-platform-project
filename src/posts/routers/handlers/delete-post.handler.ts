import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import { postsRepository } from '../../repositories/posts.repository.js';

export function deletePostHandler(
        req: Request<{ id: string }>,
        res: Response,
) {
    // Репозиторий вернёт false, если водитель с таким id не найден.
    const isDeleted = postsRepository.delete(req.params.id);

    if (!isDeleted) {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    res.sendStatus(HttpStatus.NoContent);
}