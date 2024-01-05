import { Request, Response, NextFunction } from 'express';
import { Bimestre } from '@prisma/client';

export function validateBimestre(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { bimestre } = req.params;

  const isValid = Bimestre.hasOwnProperty(bimestre.toUpperCase());

  if (!isValid) {
    return res.status(400).send({
      Erro: `Bimestre inválido; As opções válidas são ${Object.keys(
        Bimestre
      ).join(', ')}`,
    });
  }

  req.params.bimestre = bimestre.toUpperCase();

  next();
}
