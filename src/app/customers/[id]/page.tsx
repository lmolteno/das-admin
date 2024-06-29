import prisma from "@/lib/prisma";
import { Card, CardBody, CardHeader, Divider, Table, TableHeader } from "@nextui-org/react";
import { InvoicesTable } from "./invoices-table";

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (Number.isNaN(id)) {
    return undefined;
  }

  const customer = await prisma.customer.findFirst({ where: { id: id }, include: { invoices: true } })

  if (!customer) {
    return undefined;
  }

  return (
    <div className="container mx-auto">
      <p className="text-2xl">{customer.name}</p>
      <Card>
        <CardHeader>
          <p className="text-xl">Invoices</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <InvoicesTable invoices={customer.invoices} /> 
        </CardBody>
      </Card>
    </div>
  );
}
