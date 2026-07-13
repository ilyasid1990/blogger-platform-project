import request from 'supertest';
import { type Express } from 'express';
import {TESTING_PATH, TESTING_ROUTES} from '../../src/testing/constants/testing.paths.js';
import { HttpStatus } from '../../src/core/constants/http-statuses.js';

// Полностью очищает данные через тестовый эндпоинт (перед прогоном тестов).
export async function clearDb(app: Express) {
    await request(app)
            .delete(`${TESTING_PATH}${TESTING_ROUTES.ALL_DATA}`)
            .expect(HttpStatus.NoContent);
};