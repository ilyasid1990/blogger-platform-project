import { type Request, type Response } from 'express';
import { type PostInputDto } from '../../dto/post.input.dto.js';
import { HttpStatus } from '../../../core/constants/http-statuses.js';
import { type Post } from '../../types/post.js';
import { postsRepository } from '../../repositories/posts.repository.js';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util.js';

export async function createPostHandler(
  req: Request<{}, {}, PostInputDto>,
  res: Response,
) {
    try {
        // Проекция DTO -> доменная модель; дату создания добавляем здесь.
        const newPost: Omit<Post, 'blogName'> = {
            ...req.body,
            createdAt: new Date().toISOString(),
        };


        const createdPost = await postsRepository.create(newPost);
        const blogViewModel = mapToPostViewModel(createdPost);
        res.status(HttpStatus.Created).send(blogViewModel);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }
};