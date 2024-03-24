import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const users: User[] = [];

async function seedDB() {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

seedDB()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
