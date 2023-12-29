import express from 'express';
import { create, getAll } from './resultado.controller';

const resultadoRouter = express.Router();

resultadoRouter.get('/', getAll);
resultadoRouter.post('/', create);

export { resultadoRouter };
