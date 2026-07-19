import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import { postsRepository } from '../../repositories/posts.repository.js';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util.js';


export async function getPostListHandler(req: Request, res: Response) {
    try {
        const posts = await postsRepository.findAll();
        // Наружу отдаём view-model, а не «сырой» документ из БД.
        const postViewModels = posts.map(mapToPostViewModel);
        res.status(HttpStatus.Ok).send(postViewModels);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }
};