import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {blogsRepository} from '../../repositories/blogs.repository.js';

export function getBlogHandler(req: Request<{ id: string }>, res: Response) {
    const blog = blogsRepository.findById(req.params.id);

    if (!blog) {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    res.status(HttpStatus.Ok).send(blog);
};