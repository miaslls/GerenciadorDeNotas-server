import express from 'express';
import { create, getAll, remove } from './resultado.controller';
import { validateBody, validateId } from './resultado.middleware';

const resultadoRouter = express.Router();

resultadoRouter.get('/', getAll);
resultadoRouter.post('/', validateBody, create);
resultadoRouter.delete('/:id', validateId, remove);

export { resultadoRouter };
