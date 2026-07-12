// Базовый путь модуля posts (задаётся при подключении роутера в setup-app).
export const POSTS_PATH = '/posts';

// Относительные под-маршруты внутри роутера posts — чтобы не хардкодить строки.
export const POSTS_ROUTES = {
    ROOT: '/',
    BY_ID: '/:id',
} as const;