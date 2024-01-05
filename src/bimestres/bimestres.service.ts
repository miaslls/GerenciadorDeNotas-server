import prisma from '../../prisma/client';

import { Resultado, Bimestre } from '@prisma/client';

export async function getResultadosByBimestre(
  bimestre: Bimestre
): Promise<Resultado[]> {
  return await prisma.resultado.findMany({
    where: { bimestre },
    orderBy: { disciplina: 'asc' },
  });
}
