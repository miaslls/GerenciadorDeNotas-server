import { Request, Response, NextFunction } from 'express';
import { Bimestre, Disciplina } from '@prisma/client';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const errorMessages: {
    bimestre?: string;
    disciplina?: string;
    nota?: string;
  } = {};

  if (!body.hasOwnProperty('bimestre')) {
    errorMessages.bimestre = 'Bimestre não foi preenchido';
  } else if (!Bimestre.hasOwnProperty(body.bimestre)) {
    errorMessages.bimestre = `Bimestre inválido; As opções válidas são ${Object.keys(
      Bimestre
    ).join(', ')}`;
  }

  if (!body.hasOwnProperty('disciplina')) {
    errorMessages.disciplina = 'Disciplina não foi preenchido';
  } else if (!Disciplina.hasOwnProperty(body.disciplina)) {
    errorMessages.disciplina = `Disciplina inválida; As opções válidas são ${Object.keys(
      Disciplina
    ).join(', ')}`;
  }

  if (!body.hasOwnProperty('nota')) {
    errorMessages.nota = 'Nota não foi preenchido';
  } else if (typeof body.nota !== 'number' || body.nota < 0 || body.nota > 10) {
    errorMessages.nota = 'Nota inválida; Deve ser um número entre 0 e 10';
  }

  if (Object.keys(errorMessages).length > 0) {
    return res.status(400).send({ Erro: errorMessages });
  }

  next();
}

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const isValid = uuidValidate(id) && uuidVersion(id) === 4;

  if (!isValid) {
    return res
      .status(400)
      .send({ Erro: 'ID inválido; Utilize um UUID v4 válido' });
  }

  next();
}
