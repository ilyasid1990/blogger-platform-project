import { Router } from 'express';
import { getBlogListHandler} from './handlers/get-blog-list.handler.js';
import { getBlogHandler } from './handlers/get-blog.handler.js';
import { createBlogHandler } from './handlers/create-blog.handler.js';
import { updateBlogHandler } from './handlers/update-blog.handler.js';
import { deleteBlogHandler } from './handlers/delete-blog.handler.js';
// import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
// import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
// import { driverInputDtoValidation } from '../validation/driver.input-dto.validation-middlewares';
// import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import { BLOGS_ROUTES } from '../constants/blogs.paths.js';

export const blogsRouter: Router = Router({});

// Все эндпоинты водителей доступны только супер-админу (Basic Auth).
blogsRouter.use(superAdminGuardMiddleware);

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
                driverInputDtoValidation,
                inputValidationResultMiddleware,
                createBlogHandler,
        )

        .put(
                BLOGS_ROUTES.BY_ID,
                idValidation,
                driverInputDtoValidation,
                inputValidationResultMiddleware,
                updateBlogHandler,
        )

        .delete(
                BLOGS_ROUTES.BY_ID,
                idValidation,
                inputValidationResultMiddleware,
                deleteBlogHandler,
        );