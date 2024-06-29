'use server'

import prisma from "@/lib/prisma";

async function createProduct(state: { message: string, success: boolean }, formData: FormData) {
  const name = formData.get("name")?.toString();
  const price = parseFloat(formData.get("price")?.toString() ?? 'NaN');

  if (!name || Number.isNaN(price)) {
    return { message: 'missing field', success: false };
  }

  await prisma.product.create({
    data: {
      name,
      price
    }
  });

  return { message: '', success: true };
}

export default createProduct;