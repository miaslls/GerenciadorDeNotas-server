import prisma from '../../prisma/client';
import { Prisma, Resultado, BimestreLabel } from '@prisma/client';

export async function createResultado(
  data: Prisma.ResultadoCreateInput
): Promise<Resultado> {
  return await prisma.resultado.create({ data });
}

export async function getResultados(): Promise<Resultado[]> {
  return await prisma.resultado.findMany();
}

export async function getResultadosByBimestre(
  bimestre: BimestreLabel
): Promise<Resultado[]> {
  return await prisma.resultado.findMany({ where: { bimestre } });
}

export async function getResultadoById(id: string): Promise<Resultado | null> {
  return await prisma.resultado.findFirst({ where: { id } });
}

export async function removeResultado(id: string): Promise<Resultado> {
  return await prisma.resultado.delete({ where: { id } });
}
