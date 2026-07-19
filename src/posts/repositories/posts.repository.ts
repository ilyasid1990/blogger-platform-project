import { type Post } from '../types/post.js';
import { ObjectId, type WithId } from 'mongodb';
import { postCollection } from '../../db/collections.js';

// Репозиторий отвечает ТОЛЬКО за доступ к данным (CRUD).
// Он не знает про HTTP и не решает, что делать при "не найдено":
// операции изменения возвращают boolean, а решение о статусе ответа принимает handler.
export const postsRepository = {
    async findAll(): Promise<WithId<Post>[]> {
        return postCollection.find().toArray();
    },

    async findById(id: string): Promise<WithId<Post> | null> {
        return postCollection.findOne({ _id: new ObjectId(id) });
    },

    async create(newPost: Post): Promise<WithId<Post>> {
        const insertResult = await postCollection.insertOne(newPost);
        return { ...newPost, _id: insertResult.insertedId };
    },

    // Принимает уже готовый доменный объект (без createdAt) — маппинг из DTO делает handler.
    // Возвращает true, если водитель найден и обновлён, иначе false.
    async update(
      id: string,
      post: Omit<Post, 'blogName' | 'createdAt'>,
    ): Promise<boolean> {
        const updateResult = await postCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: post },
        );

        return updateResult.matchedCount > 0;
    },

    // Возвращает true, если водитель найден и удалён, иначе false.
    async delete(id: string): Promise<boolean> {
        const deleteResult = await postCollection.deleteOne({
            _id: new ObjectId(id),
        });

        return deleteResult.deletedCount > 0;
    },
};