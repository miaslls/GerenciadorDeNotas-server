import { Request, Response } from 'express';
import { getResultados } from './resultado.service';

export async function getAll(req: Request, res: Response) {
  try {
    const resultados = await getResultados();

    console.log(resultados);

    res.status(200).send({ resultados });
  } catch (error) {
    res.status(500).send({ error: 'Unexpected server error' });
  }
}
