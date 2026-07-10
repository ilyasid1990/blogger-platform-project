import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {createErrorMessages} from '../../../core/middlewares/validation/input-validation-result.middleware';
import {blogsRepository} from '../../repositories/blogs.repository.js';

export function deleteBlogHandler(
        req: Request<{ id: string }>,
        res: Response,
) {
    // Репозиторий вернёт false, если водитель с таким id не найден.
    const isDeleted = blogsRepository.delete(req.params.id);

    if (!isDeleted) {
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: 'Blog not found'}]));
        return;
    }

    res.sendStatus(HttpStatus.NoContent);
}