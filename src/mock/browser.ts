import { setupWorker } from 'msw/browser';
import { taskHandlers } from './handlers/task';

export const worker = setupWorker(...taskHandlers);
