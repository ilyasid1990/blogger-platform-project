// Базовый путь модуля blogs (задаётся при подключении роутера в setup-app).
export const BLOGS_PATH = '/blogs';

// Относительные под-маршруты внутри роутера blogs — чтобы не хардкодить строки.
export const BLOGS_ROUTES = {
    ROOT: '/',
    BY_ID: '/:id',
} as const;