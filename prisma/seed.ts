import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const users: User[] = [
  {
    id: '6f83ca43-d499-4e9d-87d2-8ce648b08d45',
    login: 'userlogin',
    password: 'password',
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6f83ca43-d499-4e9d-87d2-8ce648b08d22',
    login: 'userlogin2',
    password: 'password2',
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
