'use server'

import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

async function createLineItem(invoiceId: number, products: Product[], state: { message: string, success: boolean }, formData: FormData) {
  const productName = formData.get("productName")?.toString()
  const quantity = parseInt(formData.get("quantity")?.toString() ?? 'NaN')

  const product = products.find(p => p.name === productName)
  if (!product || Number.isNaN(quantity)) {
    return { message: 'invalid field', success: false };
  }

  try {
    await prisma.lineItem.create({
      data: {
        invoiceId,
        productId: product.id,
        quantity
      }
    });

    return {message: '', success: true };
  } catch {
    return { message: 'invalid field', success: false };
  }
}

export default createLineItem;
