import express from 'express';
import { validateBimestre } from './bimestres.middleware';
import { getByBimestre } from './bimestres.controller';

const bimestresRouter = express.Router();

bimestresRouter.get('/:bimestre', validateBimestre, getByBimestre);

export { bimestresRouter };
