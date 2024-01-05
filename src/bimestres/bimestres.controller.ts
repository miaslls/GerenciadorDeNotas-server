import { Request, Response } from 'express';
import { Bimestre } from '@prisma/client';
import { getResultadosByBimestre } from './bimestres.service';

export async function getByBimestre(req: Request, res: Response) {
  try {
    const bimestre = req.params.bimestre as Bimestre;
    const bimestreResultados = await getResultadosByBimestre(bimestre);

    return res.status(200).send(bimestreResultados);
  } catch (error) {
    console.error({ error });

    return res.status(500).send({ Erro: 'Erro Interno do Servidor' });
  }
}
