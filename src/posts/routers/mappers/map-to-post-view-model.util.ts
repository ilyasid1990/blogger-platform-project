import { type WithId } from 'mongodb';
import { type Post } from '../../types/post.js';
import { type PostViewModel } from '../../types/post-view-model.js';

// Превращает документ водителя из БД (WithId<Driver>) во view-model для ответа API:
// _id (ObjectId) -> строковый id, плюс отдаём только нужные клиенту поля.
export function mapToPostViewModel(post: WithId<Post>): PostViewModel {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
};