import { PrismaClient } from "@prisma/client";

declare global {
    // typescripts from complaint about not having this
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;