import prisma from "@/lib/prisma";
import {InvoicesTable} from "./invoices-table";
import {HeaderText} from "@/components/header-text";
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import React from "react";
import CustomerEditForm from "@/app/customers/customer-edit-form";

export default async function Page({params}: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (Number.isNaN(id)) {
    return undefined;
  }

  const customer = await prisma.customer.findFirst({where: {id: id}, include: { invoices: true }})

  if (!customer) {
    return undefined;
  }

  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-6xl font-bold">{customer.name}</h1>
          <CustomerEditForm customer={customer}/>
        </div>
        <div className="flex gap-4 font-normal pt-4 items-start">
          <Card>
            <CardHeader className="font-semibold text-xl">Address</CardHeader>
            <Divider/>
            <CardBody className="ps-4 text-lg">
              {customer.address.split('\n').map(l => (<p key={l}>{l}</p>))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="font-semibold text-xl">Contact</CardHeader>
            <Divider/>
            <CardBody className="ps-4 text-lg">
              <p>{customer.contactName}</p>
              <p>{customer.email}</p>
            </CardBody>
          </Card>
        </div>
      </div>
      <InvoicesTable invoices={customer.invoices} customer={customer}/>
    </div>
  );
}
