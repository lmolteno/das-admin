"use server";

import prisma from "@/lib/prisma";

export default async function deleteProduct(productId: number) {
  await prisma.product.delete({ where: { id: productId } });
}
