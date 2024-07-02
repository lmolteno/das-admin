'use server'

import prisma from "@/lib/prisma";

async function createInvoiceTemplate(
  state: {
    message: string,
    success: boolean
  }, formData: FormData) {
  const templateName = formData.get('name')?.toString()
  const fromAddress = formData.get('address')?.toString()
  const paymentInstructions = formData.get('payment')?.toString()

  if (!templateName || !fromAddress || !paymentInstructions) {
    return { message: 'missing field', success: false };
  }

  const paymentInstructionJson = Object.fromEntries(paymentInstructions.split('\n')
    .map(line => line.split(':').map(s => s.trim())))


  try {
    const invoice = await prisma.invoiceTemplate.create({
      data: {
        name: templateName,
        fromAddress: fromAddress,
        paymentInstructions: JSON.stringify(paymentInstructionJson)
      }
    });

    return {message: '', success: true, invoiceId: invoice.id};
  } catch (e) {
    return {message: `invalid customer ${e}`, success: false, invoiceId: undefined};
  }
}

export default createInvoiceTemplate;