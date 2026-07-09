// Данные, которые клиент присылает при создании/обновлении поста (без служебных id и createdAt — их проставляет сервер).
export type UpdatePostDto = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
};