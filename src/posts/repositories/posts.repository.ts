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
    create(newPost: Omit<Post, 'id' | 'blogName'>): Post {
        const lastPost = db.posts[db.posts.length - 1];
        const nextId = lastPost ? Number(lastPost.id) + 1 : 1;

        // 1. Находим блог в базе данных по переданному blogId
        const foundBlog = db.blogs.find((b) => b.id === newPost.blogId);

        // 2. Берем имя блога, либо подставляем заглушку, если блог вдруг не найден
        const blogName = foundBlog ? foundBlog.name : "Unknown Blog";

        const created: Post = {
            id: String(nextId),  // Добавляем сгенерированный ID в конец
            blogName: blogName,  // Добавляем найденное имя блога
            ...newPost,         // Распаковываем title, shortDescription, content, blogId
        };
        db.posts.push(created);

        return created;
    },

    // Принимает доменные поля (без служебных id/createdAt).
    // Возвращает true, если блог найден и обновлён, иначе false.
    update(id: string, post: Omit<Post, 'id' | 'blogName'>): boolean {
        const index = db.posts.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        // 1. Достаем текущий пост из базы данных
        const currentPost = db.posts[index];

        if (!currentPost) {
            return false;
        }
        // 2. Обновляем поля, гарантируя сохранение id и оригинального blogName
        db.posts[index] = {
            ...currentPost,
            ...post,
            id: currentPost.id,         // Гарантируем сохранение ID
            blogName: currentPost.blogName // Сохраняем имя блога, так как в 'post' его нет
        };

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