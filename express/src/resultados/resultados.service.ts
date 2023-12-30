import prisma from '../../prisma/client';
import { Prisma, Resultado } from '@prisma/client';

export async function createResultado(
  data: Prisma.ResultadoCreateInput
): Promise<Resultado> {
  return await prisma.resultado.create({ data });
}

export async function getResultados(): Promise<Resultado[]> {
  return await prisma.resultado.findMany();
}

export async function getResultadoById(id: string): Promise<Resultado | null> {
  return await prisma.resultado.findFirst({ where: { id } });
}

export async function removeResultado(id: string): Promise<Resultado> {
  return await prisma.resultado.delete({ where: { id } });
}

export async function checkDuplicateResultado({
  bimestre,
  disciplina,
}: Prisma.ResultadoCreateInput): Promise<boolean> {
  const existingResultado = await prisma.resultado.findFirst({
    where: { bimestre, disciplina },
  });

  return !!existingResultado;
}
