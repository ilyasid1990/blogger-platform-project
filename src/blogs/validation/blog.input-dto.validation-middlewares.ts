import { body } from 'express-validator';

const nameValidation = body('name')
  .exists()
  .withMessage('Name is not exists')
  .isString()
  .withMessage('Name should be string')
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage('Length of name is not correct');

const descriptionValidation = body('description')
  .exists()
  .withMessage('Description is not exists')
  .isString()
  .withMessage('description should be string')
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage('Length of description is not correct');

const websiteUrlValidation = body('websiteUrl')
  .exists()
  .withMessage('WebsiteUrl is not exists')
  .isString()
  .withMessage('websiteUrl should be string')
  .trim()
  .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
  .withMessage('Invalid link format. The link must start with https://');


// Набор middleware-валидаторов тела запроса на создание/обновление блога.
export const blogInputDtoValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
 ];