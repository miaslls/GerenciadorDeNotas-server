import { Request, Response, NextFunction } from 'express';
import { BimestreLabel, DisciplinaLabel } from '@prisma/client';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const errorMessages = [];

  if (!body.hasOwnProperty('bimestre') || body.bimestre === '') {
    errorMessages.push('⚠️ Bimestre não foi preenchido');
  } else if (!BimestreLabel.hasOwnProperty(body.bimestre)) {
    errorMessages.push(
      `⚠️ Bimestre inválido. As opções válidas são ${Object.keys(
        BimestreLabel
      ).join(', ')}`
    );
  }

  if (!body.hasOwnProperty('disciplina') || body.disciplina === '') {
    errorMessages.push('⚠️ Disciplina não foi preenchido');
  } else if (!DisciplinaLabel.hasOwnProperty(body.disciplina)) {
    errorMessages.push(
      `⚠️ Disciplina inválido. As opções válidas são ${Object.keys(
        DisciplinaLabel
      ).join(', ')}`
    );
  }

  if (!body.hasOwnProperty('nota') || body.nota === '') {
    errorMessages.push('⚠️ Nota não foi preenchido');
  } else if (isNaN(body.nota) || body.nota < 0 || body.nota > 10) {
    errorMessages.push(
      '⚠️ Nota inválido. Deve ser um número maior ou igual a 0, e menor ou igual a 10'
    );
  }

  if (errorMessages.length > 0) {
    const errorMessage =
      'Falha ao criar resultado. Verifique os dados e tente novamente: ' +
      errorMessages.join(' - ');

    return res.status(400).send({ Erro: errorMessage });
  }

  next();
}

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const isValid = uuidValidate(id) && uuidVersion(id) === 4;

  if (!isValid) {
    return res
      .status(400)
      .send({ Erro: '⚠️ ID inválido. Utilize um UUID (v4) válido' });
  }

  next();
}
