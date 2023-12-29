import prisma from '../../prisma/client';
import { Resultado } from '@prisma/client';

export async function getResultados(): Promise<Resultado[]> {
  return await prisma.resultado.findMany();
}
