import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {blogsRepository} from '../../repositories/blogs.repository.js';

export async function deleteBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    // Репозиторий вернёт false, если водитель с таким id не найден.
    const isDeleted = await blogsRepository.delete(req.params.id);

    if (!isDeleted) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    res.sendStatus(HttpStatus.NoContent);

  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};