import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-expect-error modifying globals!
  if (!global.prisma) { global.prisma = new PrismaClient(); }
  // @ts-expect-error modifying globals!
  prisma = global.prisma;
}

export default prisma;