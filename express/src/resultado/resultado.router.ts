import express from 'express';
import { create, getAll, remove } from './resultado.controller';
import { validateBody } from './resultado.middleware';

const resultadoRouter = express.Router();

resultadoRouter.get('/', getAll);
resultadoRouter.post('/', validateBody, create);
resultadoRouter.delete('/:id', remove);

export { resultadoRouter };
