import React from "react";
import prisma from "@/lib/prisma";
import InvoiceDisplay from "@/app/invoices/[id]/invoice-display";

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (Number.isNaN(id)) {
    return undefined;
  }

  const invoice = await prisma.invoice.findFirst({
    where: { id: id },
    include: {
      lineItems: { include: { product: true }
    },
    customer: true
    },
  });

  const products = await prisma.product.findMany();

  if (!invoice) {
    return undefined;
  }

  return <InvoiceDisplay invoice={invoice} products={products} />
}
