import {type Blog} from "../blogs/types/blog.js";
import {type Post} from "../posts/types/post.js";

export const db = {
    blogs: <Blog[]>[
        {
            id: "1",
            name: "IT-Incubator Tech Blog",
            description: "Статьи о backend-разработке и TypeScript",
            websiteUrl: "https://it-incubator.io"
        },
        {
            id: "2",
            name: "Samurai Code",
            description: "Блог об архитектуре ПО и чистом коде",
            websiteUrl: "https://samurai-dev.com"
        },
        {
            id: "3",
            name: "Express and Nest Tips",
            description: "Полезные фишки и middleware дляNode.js бэкенда",
            websiteUrl: "https://express-tips.net"
        }
    ],
    posts: <Post[]>[
        {
            id: "1",
            title: "Запуск Express на TypeScript",
            shortDescription: "Краткое руководство по настройке ESM и tsconfig",
            content: "В этой статье мы подробно разберем, как исправить ошибки компиляции, настроить verbatimModuleSyntax и запустить проект через pnpm.",
            blogId: "1",
            blogName: "IT-Incubator Tech Blog"
        },
        {
            id: "2",
            title: "Путь Самурая: Архитектура API",
            shortDescription: "Разделение логики на DTO, Репозитории и Сервисы",
            content: "Полноценный разбор паттернов декомпозиции. Учимся не писать всю бизнес-логику внутри роутов Express, разделяя данные на Input и View модели.",
            blogId: "2",
            blogName: "Samurai Code"
        },
        {
            id: "3",
            title: "Как тестировать эндпоинты с Supertest",
            shortDescription: "Пишем первые интеграционные тесты в Jest",
            content: "Пошаговый гайд по изоляции тестов. Использование clearDB, отправка фейковых объектов DTO и проверка статус-кодов ответов 200, 201 и 400.",
            blogId: "1",
            blogName: "IT-Incubator Tech Blog"
        },
        {
            id: "4",
            title: "Валидация через регулярные выражения",
            shortDescription: "Разбор паттерна верификации строк для websiteUrl",
            content: "Изучаем, как работает строгое регулярное выражение протокола https, экранирование спецсимволов и интеграция проверки с библиотекой express-validator.",
            blogId: "3",
            blogName: "Express and Nest Tips"
        }
    ]
}