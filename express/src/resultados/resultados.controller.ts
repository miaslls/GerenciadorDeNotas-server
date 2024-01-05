import { Prisma, Bimestre } from '@prisma/client';
import { Request, Response } from 'express';
import {
  createResultado,
  getResultados,
  getResultadosByBimestre,
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
        Erro: `Conflito. Já existe um registro com a disciplina '${
          body.disciplina
        }' referente ao ${body.bimestre.toLowerCase()} bimestre`,
      });
    }

    const resultado = await createResultado(body);

    return res.status(201).send({ resultado });
  } catch (error) {
    console.error({ error });

    return res.status(500).send({ Erro: 'Erro Interno do Servidor' });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const groupbyParam = req.query.groupby;

    if (groupbyParam === 'bimestre') {
      const queries = Object.values(Bimestre).map((bimestre) =>
        getResultadosByBimestre(bimestre)
      );

      const groupedResultados = await Promise.all(queries);

      return res.status(200).send(groupedResultados);
    }

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
      return res.status(404).send({ Erro: 'Resultado não encontrado' });
    }

    await removeResultado(id);

    return res.status(200).send({
      Mensagem: 'Resultado removido com sucesso',
    });
  } catch (error) {
    console.error({ error });

    return res.status(500).send({ Erro: 'Erro Interno do Servidor' });
  }
}
