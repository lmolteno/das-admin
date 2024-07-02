"use server"

import prisma from "@/lib/prisma";

export const createPdf = async (invoiceId: number) => {
  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId },
    include: {
      lineItems: {
        include: { product: true }
      },
      customer: true,
    }
  });

  if (invoice === null) {
    return { success: false }
  }

  console.log(require('child_process').execSync("ls", { encoding: "utf-8" }));
}