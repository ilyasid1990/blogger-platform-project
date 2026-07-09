// Данные, которые клиент присылает при создании/обновлении блога (без служебных id и createdAt — их проставляет сервер).
export type UpdateBlogDto = {
    name: string;
    description: string;
    websiteUrl: string;
};