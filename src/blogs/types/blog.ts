// Структура объекта Blog в БД
export type Blog = {
    id:	string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
};