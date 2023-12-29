import express from 'express';
import { create, getAll, remove } from './resultado.controller';

const resultadoRouter = express.Router();

resultadoRouter.get('/', getAll);
resultadoRouter.post('/', create);
resultadoRouter.delete('/:id', remove);

export { resultadoRouter };
