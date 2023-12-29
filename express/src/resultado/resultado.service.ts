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
