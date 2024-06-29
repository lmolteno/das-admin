import prisma from "@/lib/prisma";
import InvoiceTable from "./invoice-table";


export default async function Customers() {
  const invoices = await prisma.invoice.findMany()
  const customers = await prisma.customer.findMany()

  return (
    <div className="container mx-auto">
      <InvoiceTable invoices={invoices} customers={customers} />
    </div>
  );
}
