import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import { postsRepository } from '../../repositories/posts.repository.js';

export function getPostListHandler(req: Request, res: Response) {
    res.status(HttpStatus.Ok).send(postsRepository.findAll());
};