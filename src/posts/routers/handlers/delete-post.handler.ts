import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import { postsRepository } from '../../repositories/posts.repository.js';

export async function deletePostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
    try {
        // Репозиторий вернёт false, если водитель с таким id не найден.
        const isDeleted = await postsRepository.delete(req.params.id);

        if (!isDeleted) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }

        res.sendStatus(HttpStatus.NoContent);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }
};