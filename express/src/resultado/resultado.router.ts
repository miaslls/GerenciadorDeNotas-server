import express from 'express';
import { getAll } from './resultado.controller';

const resultadoRouter = express.Router();

resultadoRouter.get('/', getAll);

export { resultadoRouter };
