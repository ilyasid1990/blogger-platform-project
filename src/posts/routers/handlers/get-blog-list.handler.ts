import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {blogsRepository} from '../../repositories/blogs.repository.js';

export function getBlogListHandler(req: Request, res: Response) {
    res.status(HttpStatus.Ok).send(blogsRepository.findAll());
};