import { type Request, type Response } from 'express';
import { type PostInputDto } from '../../dto/post.input.dto.js';
import { HttpStatus } from '../../../core/constants/http-statuses.js';
import { type Post } from '../../types/post.js';
import { postsRepository } from '../../repositories/posts.repository.js';

export function createPostHandler(
        req: Request<{}, {}, PostInputDto>,
        res: Response,
) {
    // Тело запроса уже проверено middleware-валидаторами, поэтому здесь только создаём.
    const newPost: Omit<Post, 'id' | 'blogName'> = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
    };

    const createdPost = postsRepository.create(newPost);
    res.status(HttpStatus.Created).send(createdPost);
};