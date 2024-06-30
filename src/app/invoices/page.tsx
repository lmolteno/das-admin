import prisma from "@/lib/prisma";
import InvoiceTable from "./invoice-table";
import {HeaderText} from "@/components/header-text";


export default async function Customers() {
  const invoices = await prisma.invoice.findMany()
  const customers = await prisma.customer.findMany()

  return (
    <div className="container mx-auto">
      <HeaderText><h1>Invoices</h1></HeaderText>
      <InvoiceTable invoices={invoices} customers={customers} />
    </div>
  );
}
