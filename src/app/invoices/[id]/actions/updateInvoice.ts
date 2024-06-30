"use server";
import prisma from "@/lib/prisma";

export async function updateInvoiceDate(invoiceId: number, value: Date) {
  await prisma.invoice.update({ data: { invoiceDate: value }, where: { id: invoiceId }});
}

export async function updateDueDate(invoiceId: number, value: Date) {
  await prisma.invoice.update({ data: { dueDate: value }, where: { id: invoiceId }});
}

export async function removeLineItem(lineItemId: number) {
  await prisma.lineItem.delete({ where: { id: lineItemId } });
}