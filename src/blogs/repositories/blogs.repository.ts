import {type Blog} from "../types/blog.js";
import {db} from "../../db/in-memory-db.js";

export const blogsRepository = {
    findAll(): Blog[] {
        return db.blogs;
    },

    findById(id: string): Blog | null {
        // Если ничего не нашли, find вернёт undefined — приводим к null.
        return db.blogs.find((b) => b.id === id) ?? null;
    },

    // Принимает доменные поля без id (id генерируем здесь) и возвращает созданный блог.
    create(newBlog: Omit<Blog, 'id'>): Blog {
        const lastBlog = db.blogs[db.blogs.length - 1];
        const nextId = lastBlog ? Number(lastBlog.id) + 1 : 1;
        const created: Blog = {
            id: String(nextId),
            ...newBlog,
        };

        db.blogs.push(created);
        return created;
    },

    // Принимает доменные поля (без служебных id/createdAt).
    // Возвращает true, если блог найден и обновлён, иначе false.
    update(id: string, blog: Omit<Blog, 'id'>): boolean {
        const index = db.blogs.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        // Обновляем поля, сохраняя служебные id.
        db.blogs[index] = {...db.blogs[index]!, ...blog};
        return true;
    },

    // Возвращает true, если блог найден и удалён, иначе false.
    delete(id: string): boolean {
        const index = db.blogs.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        db.blogs.splice(index, 1);
        return true;
    },
};