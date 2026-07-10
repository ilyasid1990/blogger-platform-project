import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {postsRepository} from '../../repositories/posts.repository.js';

export function getPostHandler(req: Request<{ id: string }>, res: Response) {
  const post = postsRepository.findById(req.params.id);

  if (!post) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  res.status(HttpStatus.Ok).send(post);
};