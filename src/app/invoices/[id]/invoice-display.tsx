"use client"

import {Customer, Invoice, LineItem, Product} from "@prisma/client";
import {
  Autocomplete,
  AutocompleteItem, Button, Card, CardBody, CardHeader, Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import {FaCircleExclamation, FaPlus} from "react-icons/fa6";
import React from "react";
import {useFormState} from "react-dom";
import createLineItem from "@/app/invoices/actions/createLineItem";

export default function InvoiceDisplay({invoice, products}: {
  invoice: Invoice & { lineItems: (LineItem & { product: Product })[], customer: Customer },
  products: Product[]
}) {
  const [formState, formAction] = useFormState(createLineItem.bind(null, invoice.id, products), { message: '', success: false })

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex flex-row justify-between items-center">
          <p className="text-4xl">{invoice.customer.name}</p>
          <div className="text-right">
            <p>Invoiced {invoice.invoiceDate.toLocaleDateString()}</p>
            <p>Due {invoice.dueDate.toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Table removeWrapper className="col-span-2">
          <TableHeader>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>QUANTITY</TableColumn>
            <TableColumn align="end">SUBTOTAL</TableColumn>
          </TableHeader>
          <TableBody>
            {invoice.lineItems.flatMap((lineItem) => {
              return [(
                <TableRow key={lineItem.id}>
                  <TableCell>{lineItem.product.name}</TableCell>
                  <TableCell>${lineItem.product.price.toFixed(2)}</TableCell>
                  <TableCell>{lineItem.quantity}</TableCell>
                  <TableCell>${(lineItem.quantity * lineItem.product.price).toFixed(2)}</TableCell>
                </TableRow>
              )]
            })}
          </TableBody>
        </Table>
        <div className="flex justify-end items-center my-4 h-10 rounded-md gap-4 bg-default-100">
          <p className="uppercase text-foreground-500 text-tiny font-semibold">TOTAL</p>
          <p
            className="text-sm pe-3">${invoice.lineItems.reduce((p, c) => p + (c.product.price * c.quantity), 0).toFixed(2)}</p>
        </div>
        <form action={formAction} className="flex flex-row gap-4">
          <Autocomplete defaultItems={products} label="Product" name="productName" placeholder="Select product">
            {(product) => <AutocompleteItem value={product.id} key={product.id}>{product.name}</AutocompleteItem>}
          </Autocomplete>
          <div className="flex flex-row gap-4 items-center">
            <Input type="number" label="Quantity" name="quantity" defaultValue="1"/>
            <Button isIconOnly size="lg" variant="bordered" className="h-full" type="submit">
              <FaPlus/>
            </Button>
          </div>
        </form>
        {formState.message && (
          <Card className="col-span-2 bg-red-200">
            <CardBody className="flex flex-row gap-4">
              <FaCircleExclamation/>
              {formState.message}
            </CardBody>
          </Card>
        )}
      </CardBody>
    </Card>
  )
}