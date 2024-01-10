import { Request, Response, NextFunction } from 'express';
import { Bimestre, Disciplina } from '@prisma/client';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  const errorMessages: string[] = [];

  if (!body.hasOwnProperty('bimestre')) {
    errorMessages.push('Bimestre não foi preenchido');
  } else if (!Bimestre.hasOwnProperty(body.bimestre)) {
    const error =
      'Bimestre inválido; As opções válidas são ' +
      Object.keys(Bimestre).join(', ');

    errorMessages.push(error);
  }

  if (!body.hasOwnProperty('disciplina')) {
    errorMessages.push('Disciplina não foi preenchido');
  } else if (!Disciplina.hasOwnProperty(body.disciplina)) {
    const error =
      'Disciplina inválida; As opções válidas são ' +
      Object.keys(Disciplina).join(', ');

    errorMessages.push(error);
  }

  if (!body.hasOwnProperty('nota')) {
    errorMessages.push('Nota não foi preenchido');
  } else if (typeof body.nota !== 'number' || body.nota < 0 || body.nota > 10) {
    errorMessages.push('Nota inválida; Deve ser um número entre 0 e 10');
  }

  if (errorMessages.length > 0) {
    return res.status(400).send({ message: errorMessages.join('; ') });
  }

  next();
}

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const isValid = uuidValidate(id) && uuidVersion(id) === 4;

  if (!isValid) {
    return res
      .status(400)
      .send({ message: 'ID inválido; Utilize um UUID v4 válido' });
  }

  next();
}
