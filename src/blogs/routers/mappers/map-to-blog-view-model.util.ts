import { type WithId } from 'mongodb';
import { type Blog } from '../../types/blog.js';
import { type BlogViewModel } from '../../types/blog-view-model.js';

// Превращает документ водителя из БД (WithId<Driver>) во view-model для ответа API:
// _id (ObjectId) -> строковый id, плюс отдаём только нужные клиенту поля.
export function mapToBlogViewModel(blog: WithId<Blog>): BlogViewModel {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
};