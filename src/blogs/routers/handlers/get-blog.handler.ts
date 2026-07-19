import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {blogsRepository} from '../../repositories/blogs.repository.js';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util.js';


export async function getBlogHandler(req: Request<{id: string}>, res: Response) {
  try {
    const blog = await blogsRepository.findById(req.params.id);

    if (!blog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }


    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);

  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};