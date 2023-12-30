const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.resultado.createMany({
    data: [
      { bimestre: 'PRIMEIRO', disciplina: 'Biologia', nota: 8.5 },
      { bimestre: 'PRIMEIRO', disciplina: 'Artes', nota: 7.2 },
      { bimestre: 'PRIMEIRO', disciplina: 'Geografia', nota: 9.1 },
      { bimestre: 'PRIMEIRO', disciplina: 'Sociologia', nota: 6.6 },
    ],
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
