import {Collection, Db} from 'mongodb';
import {type Blog} from "../blogs/types/blog.js";
import {type Post} from "../posts/types/post.js";

export const BLOG_COLLECTION_NAME = 'blogs';
export const POST_COLLECTION_NAME = 'posts';

// Коллекции инициализируются один раз в initCollections() после подключения к БД.
// До этого момента они undefined, поэтому обращаться к ним можно только после runDB().
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;

// Создаём объекты коллекций из подключённой базы.
export function initCollections(db: Db): void {
  blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
  postCollection = db.collection<Post>(POST_COLLECTION_NAME);
}

// Список всех коллекций считаем в МОМЕНТ вызова (уже после initCollections),
// а не на этапе загрузки модуля — иначе сюда попали бы ещё не инициализированные (undefined) коллекции.
export function getAllCollections(): Collection<any>[] {
  return [blogCollection, postCollection];
};