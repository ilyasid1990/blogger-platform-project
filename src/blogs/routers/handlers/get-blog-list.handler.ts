import {type Request, type Response} from 'express';
import {HttpStatus} from '../../../core/constants/http-statuses.js';
import {blogsRepository} from '../../repositories/blogs.repository.js';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util.js';


export async function getBlogListHandler(req: Request, res: Response) {
    try {
        const blogs = await blogsRepository.findAll();
        // Наружу отдаём view-model, а не «сырой» документ из БД.
        const blogViewModels = blogs.map(mapToBlogViewModel);
        res.status(HttpStatus.Ok).send(blogViewModels);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }
};