"use server";

import prisma from "@/lib/prisma";

export default async function deleteInvoiceTemplate(invoiceTemplateId: number) {
  await prisma.invoiceTemplate.delete({ where: { id: invoiceTemplateId } });
}
