import { Request, Response, NextFunction } from 'express';
import { BimestreLabel, DisciplinaLabel } from '@prisma/client';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const errorMessages = [];

  if (!body.hasOwnProperty('bimestre') || body.bimestre === '') {
    errorMessages.push("⚠️ O campo 'bimestre' não foi preenchido");
  } else if (!BimestreLabel.hasOwnProperty(body.bimestre)) {
    errorMessages.push(
      "⚠️ O campo 'bimestre' deve ser: 'PRIMEIRO', 'SEGUNDO', 'TERCEIRO', ou 'QUARTO'"
    );
  }

  if (!body.hasOwnProperty('disciplina') || body.disciplina === '') {
    errorMessages.push("⚠️ O campo 'disciplina' não foi preenchido");
  } else if (!DisciplinaLabel.hasOwnProperty(body.disciplina)) {
    errorMessages.push(
      "⚠️ O campo 'disciplina' deve ser: 'Biologia', 'Artes', 'Geografia', ou 'Sociologia'"
    );
  }

  if (!body.hasOwnProperty('nota') || body.nota === '') {
    errorMessages.push("⚠️ O campo 'nota' não foi preenchido");
  } else if (isNaN(body.nota) || body.nota < 0 || body.nota > 10) {
    errorMessages.push(
      "⚠️ O campo 'nota' deve ser um número maior ou igual a 0, e menor ou igual a 10"
    );
  }

  if (errorMessages.length > 0) {
    const errorMessage =
      'O Registro não foi criado: ' + errorMessages.join(' - ');

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
      .send({ Erro: "⚠️ O campo 'id' deve ser um UUID (v4) válido" });
  }

  next();
}
