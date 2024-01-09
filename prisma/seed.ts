import prisma from './client';

async function main() {
  await prisma.resultado.createMany({
    data: [
      { bimestre: 'PRIMEIRO', disciplina: 'BIOLOGIA', nota: 8.5 },
      { bimestre: 'PRIMEIRO', disciplina: 'ARTES', nota: 7.2 },
      { bimestre: 'PRIMEIRO', disciplina: 'GEOGRAFIA', nota: 9.1 },
      { bimestre: 'PRIMEIRO', disciplina: 'SOCIOLOGIA', nota: 6.6 },
    ],
    skipDuplicates: true,
  });

  console.info('✅ Database seeded successfully 🌱');
}
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
