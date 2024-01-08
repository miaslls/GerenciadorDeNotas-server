import express from 'express';
import { create, getAll, remove } from './resultados.controller';
import { validateBody, validateId } from './resultados.middleware';

const resultadosRouter = express.Router();

resultadosRouter.get('/', getAll);
resultadosRouter.post('/', validateBody, create);
resultadosRouter.delete('/:id', validateId, remove);

export { resultadosRouter };
