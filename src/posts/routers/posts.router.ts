import {Router} from 'express';
import {getPostListHandler} from './handlers/get-post-list.handler.js';
import {getPostHandler} from './handlers/get-post.handler.js';
import {createPostHandler} from './handlers/create-post.handler.js';
import {updatePostHandler} from './handlers/update-post.handler.js';
import {deletePostHandler} from './handlers/delete-post.handler.js';
import { idValidation } from '../../core/middlewares-validation/params-id.validation.middleware.js';
import { inputValidationResultMiddleware } from '../../core/middlewares-validation/input-validation-result.middleware.js';
// import { driverInputDtoValidation } from '../validation/driver.input-dto.validation-middlewares';
// import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import {POSTS_ROUTES} from '../constants/posts.paths.js';

export const postsRouter: Router = Router({});

// Все эндпоинты водителей доступны только супер-админу (Basic Auth).
postsRouter.use(superAdminGuardMiddleware);

// Каждая цепочка: валидация -> проверка её результата -> handler.
// Пути маршрутов берём из констант модуля, а не из строковых литералов.
postsRouter
  .get(POSTS_ROUTES.ROOT, getPostListHandler)

  .get(
    POSTS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getPostHandler,
  )

  .post(
    POSTS_ROUTES.ROOT,
    driverInputDtoValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )

  .put(
    POSTS_ROUTES.BY_ID,
    idValidation,
    driverInputDtoValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )

  .delete(
    POSTS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler,
  );