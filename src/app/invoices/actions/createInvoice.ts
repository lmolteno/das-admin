'use server'

import prisma from "@/lib/prisma";
import {Customer} from "@prisma/client";

async function createInvoice(
  customers: Customer[],
  state: {
  message: string,
  success: boolean,
  invoiceId: number | undefined
}, formData: FormData) {
  const customerName = formData.get("customer")?.toString();

  const customer = customers.find(c => c.name === customerName);

  if (!customer) {
    return { message: 'could not find customer', success: false, invoiceId: undefined };
  }

  try {
    const invoice = await prisma.invoice.create({
      data: {
        customerId: customer.id
      }
    });

    return {message: '', success: true, invoiceId: invoice.id};
  } catch (e) {
    return {message: `invalid customer ${e}`, success: false, invoiceId: undefined};
  }
}

export default createInvoice;