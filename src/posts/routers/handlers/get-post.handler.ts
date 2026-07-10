import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {createErrorMessages} from '../../../core/middlewares/validation/input-validation-result.middleware';
import {blogsRepository} from '../../repositories/blogs.repository.js';

export function getPostHandler(req: Request<{ id: string }>, res: Response) {
    const blog = blogsRepository.findById(req.params.id);

    if (!blog) {
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: 'Driver not found'}]));
        return;
    }

    res.status(HttpStatus.Ok).send(blog);
};