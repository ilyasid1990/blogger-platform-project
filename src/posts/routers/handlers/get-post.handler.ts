import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {postsRepository} from '../../repositories/posts.repository.js';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util.js';


export async function getPostHandler(req: Request<{id: string}>, res: Response) {
  try {
    const post = await postsRepository.findById(req.params.id);

    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }


    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Ok).send(postViewModel);

  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};