import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Lucas Leão",
    email: "lucasleaolima@gmail.com",
  },
  {
    name: "Karen Sabrina",
    email: "karensabrina@gmail.com",
  },
];

export async function main() {
  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }
}

main();
