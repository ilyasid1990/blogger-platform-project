import { type Post } from '../types/post.js';
import { ObjectId, type WithId } from 'mongodb';
import { postCollection, blogCollection  } from '../../db/collections.js';

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

    async create(newPost: Omit<Post, 'blogName'>): Promise<WithId<Post>> {
        // 1. Асинхронно находим блог в MongoDB по его blogId.
        // Переводим строку newPost.blogId в ObjectId для корректного поиска.
        const foundBlog = await blogCollection.findOne({ _id: new ObjectId(newPost.blogId) });

        // 2. Берем имя блога или ставим заглушку, если блог не найден
        const blogName = foundBlog ? foundBlog.name : "Unknown Blog";

        // 3. Формируем объект для сохранения в MongoDB (без поля id, база сама создаст _id)
        const postToInsert = {
            ...newPost,
            blogName: blogName,
        };

        // 4. Сохраняем в коллекцию. Кастуем к any, чтобы обойти строгие типы драйвера.
        const insertResult = await postCollection.insertOne(postToInsert as any);

        // 5. Возвращаем созданный объект вместе с сгенерированным MongoDB идентификатором _id
        return {
            ...postToInsert,
            _id: insertResult.insertedId,
        } as WithId<Post>;
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