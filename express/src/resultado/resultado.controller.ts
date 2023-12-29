import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import {
  createResultado,
  getResultados,
  getResultadoById,
  removeResultado,
} from './resultado.service';

export async function create(req: Request, res: Response) {
  try {
    const body: Prisma.ResultadoCreateInput = req.body;
    const resultado = await createResultado(body);

    return res.status(201).send({ resultado });
  } catch (error) {
    console.error({ error });

    return res.status(500).send({ Erro: 'Erro Interno do Servidor' });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const resultados = await getResultados();

    return res.status(200).send({ resultados });
  } catch (error) {
    console.error({ error });

    return res.status(500).send({ Erro: 'Erro Interno do Servidor' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const resultado = await getResultadoById(id);

    if (!resultado) {
      return res
        .status(404)
        .send({ Erro: `O Resultado com id '${id}' não foi encontrado` });
    }

    await removeResultado(id);

    return res.status(200).send({
      Mensagem: `O Resultado com id '${id}' foi removido com sucesso`,
    });
  } catch (error) {
    console.error({ error });

    return res.status(500).send({ Erro: 'Erro Interno do Servidor' });
  }
}
