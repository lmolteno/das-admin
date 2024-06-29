import prisma from "@/lib/prisma";
import { Customer } from "@prisma/client";
import CustomerTable from "./customer-table";
import CustomerForm from "./customer-form";

async function getData() {
  const customers = await prisma.customer.findMany()
  return customers;
}

export default async function Customers() {
  const customers: Customer[] = await getData()

  return (
    <div className="container mx-auto">
      <CustomerTable customers={customers} />
    </div>
  );
}
