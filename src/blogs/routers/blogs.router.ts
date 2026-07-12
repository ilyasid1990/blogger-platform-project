import { Router } from 'express';
import { getBlogListHandler} from './handlers/get-blog-list.handler.js';
import { getBlogHandler } from './handlers/get-blog.handler.js';
import { createBlogHandler } from './handlers/create-blog.handler.js';
import { updateBlogHandler } from './handlers/update-blog.handler.js';
import { deleteBlogHandler } from './handlers/delete-blog.handler.js';
import { idValidation } from '../../core/middlewares-validation/params-id.validation.middleware.js';
import { inputValidationResultMiddleware } from '../../core/middlewares-validation/input-validation-result.middleware.js';
import { blogInputDtoValidation } from '../validation/blog.input-dto.validation-middlewares.js';
import { superAdminGuardMiddleware } from '../../auth-middlewares/super-admin.guard.middleware.js';
import { BLOGS_ROUTES } from '../constants/blogs.paths.js';

export const blogsRouter: Router = Router({});


// Каждая цепочка: валидация -> проверка её результата -> handler.
// Пути маршрутов берём из констант модуля, а не из строковых литералов.
blogsRouter
        .get(BLOGS_ROUTES.ROOT, getBlogListHandler)

        .get(
                BLOGS_ROUTES.BY_ID,
                idValidation,
                inputValidationResultMiddleware,
                getBlogHandler,
        )

        .post(
                BLOGS_ROUTES.ROOT,
                superAdminGuardMiddleware,
                blogInputDtoValidation,
                inputValidationResultMiddleware,
                createBlogHandler,
        )

        .put(
                BLOGS_ROUTES.BY_ID,
                superAdminGuardMiddleware,
                idValidation,
                blogInputDtoValidation,
                inputValidationResultMiddleware,
                updateBlogHandler,
        )

        .delete(
                BLOGS_ROUTES.BY_ID,
                superAdminGuardMiddleware,
                idValidation,
                inputValidationResultMiddleware,
                deleteBlogHandler,
        );