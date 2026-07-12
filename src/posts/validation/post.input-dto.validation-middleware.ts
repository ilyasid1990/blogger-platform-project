import { body } from 'express-validator';

const titleValidation = body('title')
  .exists()
  .withMessage('Title is not exists')
  .isString()
  .withMessage('Title should be string')
  .trim()
  .notEmpty()
  .withMessage('Title can not be empty')
  .isLength({ max: 30 })
  .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('shortDescription')
  .exists()
  .withMessage('ShortDescription is not exists')
  .isString()
  .withMessage('ShortDescription should be string')
  .trim()
  .notEmpty()
  .withMessage('ShortDescription can not be empty')
  .isLength({ max: 100 })
  .withMessage('Length of shortDescription is not correct');

const contentValidation = body('content')
  .exists()
  .withMessage('Content is not exists')
  .isString()
  .withMessage('Content should be string')
  .trim()
  .notEmpty()
  .withMessage('Content can not be empty')
  .isLength({ max: 1000 })
  .withMessage('Length of content is not correct');

const blogIdValidation = body('blogId')
  .exists()
  .withMessage('BlogId is not exists')
  .isString()
  .withMessage('BlogId should be string')
  .notEmpty()
  .withMessage('BlogId can not be empty');


// Набор middleware-валидаторов тела запроса на создание/обновление блога.
export const postInputDtoValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
];