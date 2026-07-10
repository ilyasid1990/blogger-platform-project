import {type Post} from "../types/post.js";
import {db} from "../../db/in-memory-db.js";

export const postsRepository = {
    findAll(): Post[] {
        return db.posts;
    },

    findById(id: string): Post | null {
        // Если ничего не нашли, find вернёт undefined — приводим к null.
        return db.posts.find((b) => b.id === id) ?? null;
    },

    // Принимает доменные поля без id (id генерируем здесь) и возвращает созданный пост.
    create(newPost: Omit<Post, 'id'>): Post {
        const lastPost = db.posts[db.posts.length - 1];
        const nextId = lastPost ? Number(lastPost.id) + 1 : 1;
        const created: Post = {
            id: String(nextId),
            ...newPost,
        };

        db.posts.push(created);
        return created;
    },

    // Принимает доменные поля (без служебных id/createdAt).
    // Возвращает true, если блог найден и обновлён, иначе false.
    update(id: string, post: Omit<Post, 'id'>): boolean {
        const index = db.posts.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        // Обновляем поля, сохраняя служебные id.
        db.posts[index] = {...db.posts[index]!, ...post};
        return true;
    },

    // Возвращает true, если пост найден и удалён, иначе false.
    delete(id: string): boolean {
        const index = db.posts.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        db.posts.splice(index, 1);
        return true;
    },
};