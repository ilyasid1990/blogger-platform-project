import { type Request, type Response } from 'express';
import { db } from '../../../db/in-memory-db.js';
import { HttpStatus } from '../../../core/constants/http-statuses.js';

// Полностью очищает данные (используется в e2e-тестах перед прогоном).
export function truncateDbHandler(req: Request, res: Response) {
  db.blogs = [];
  db.posts = [];
  res.sendStatus(HttpStatus.NoContent);
};