import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import {
  createResultado,
  getResultados,
  getResultadoById,
  removeResultado,
  checkDuplicateResultado,
} from './resultados.service';

export async function create(req: Request, res: Response) {
  try {
    const body: Prisma.ResultadoCreateInput = req.body;
    const duplicateExists = await checkDuplicateResultado(
      body.bimestre,
      body.disciplina
    );

    if (duplicateExists) {
      return res.status(409).send({
        message: `Conflito: Já existe um registro com a disciplina '${
          body.disciplina.charAt(0) + body.disciplina.toLowerCase().substring(1)
        }' referente ao ${body.bimestre.toLowerCase()} bimestre`,
      });
    }

    const resultado = await createResultado(body);

    return res.status(201).send(resultado);
  } catch (error) {
    console.error(error);

    return res.status(500).send({ message: 'Erro Interno do Servidor' });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const resultados = await getResultados();

    return res.status(200).send(resultados);
  } catch (error) {
    console.error(error);

    return res.status(500).send({ message: 'Erro Interno do Servidor' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const resultado = await getResultadoById(id);

    if (!resultado) {
      return res.status(404).send({ message: 'Resultado não encontrado' });
    }

    await removeResultado(id);

    return res.status(200).send({
      message: 'Resultado removido com sucesso',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({ message: 'Erro Interno do Servidor' });
  }
}
