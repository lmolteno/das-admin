'use server'

import prisma from "@/lib/prisma";

async function createInvoice(
  state: {
    message: string,
    success: boolean,
    invoiceId: number | undefined
  }, formData: FormData) {
  const customerName = formData.get("customer")?.toString();
  const templateName = formData.get("template")?.toString();

  const customer = await prisma.customer.findFirst({where: {name: customerName}})
  const template = await prisma.invoiceTemplate.findFirst({where: {name: templateName}})

  if (!customer) {
    return {message: 'could not find customer', success: false, invoiceId: undefined};
  }

  if (!template) {
    return {message: 'could not find template', success: false, invoiceId: undefined};
  }

  try {
    const invoice = await prisma.invoice.create({
      data: {
        customerId: customer.id,
        templateId: template.id
      }
    });

    return {message: '', success: true, invoiceId: invoice.id};
  } catch (e) {
    return {message: `invalid customer ${e}`, success: false, invoiceId: undefined};
  }
}

export default createInvoice;