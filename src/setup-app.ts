import express, {type Express, type Request, type Response} from "express";
import {HttpStatus} from "./core/constants/http-statuses.js";
import {BLOGS_PATH} from "./blogs/constants/blogs.paths.js";
import {POSTS_PATH} from "./posts/constants/posts.paths.js";
import {blogsRouter} from "./blogs/routers/blogs.router.js";
import {postsRouter} from "./posts/routers/posts.router.js";
import {TESTING_PATH} from "./testing/constants/testing.paths.js";
import {testingRouter} from "./testing/routers/testing.router.js";


export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send("Hello world!!!");
    });

    // Каждый модуль подключается по своему базовому пути.
    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH, testingRouter);


    return app;
};