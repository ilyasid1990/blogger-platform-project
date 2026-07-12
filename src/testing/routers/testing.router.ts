import { Router } from 'express';
import { truncateDbHandler } from './handlers/truncate-db.handler.js';
import { TESTING_ROUTES } from '../constants/testing.paths.js';

export const testingRouter: Router = Router({});

testingRouter.delete(TESTING_ROUTES.ALL_DATA, truncateDbHandler);