import prisma from "@/lib/prisma";
import {Customer} from "@prisma/client";
import CustomerTable from "./customer-table";
import {HeaderText} from "@/components/header-text";

export default async function Customers() {
  const customers = await prisma.customer.findMany()

  return (
    <div className="container mx-auto">
      <HeaderText><h1>Customers</h1></HeaderText>
      <CustomerTable customers={customers} />
    </div>
  );
}
