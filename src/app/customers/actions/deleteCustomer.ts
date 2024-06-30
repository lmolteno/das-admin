"use server";

import prisma from "@/lib/prisma";

export async function deleteCustomer(customerId: number) {
  try {
    await prisma.customer.delete({where: {id: customerId}});
    return { success: true };
  } catch {
    return { success: false, message: "failed to delete - make sure all invoices and products for this customer are deleted first" };
  }
}