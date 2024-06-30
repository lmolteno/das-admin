"use client"

import {Customer, Invoice, LineItem, Product} from "@prisma/client";
import {fromDate, getLocalTimeZone, toCalendarDate} from "@internationalized/date";
import {
  Autocomplete,
  AutocompleteItem, Button, Card, CardBody, CardHeader, DatePicker, DateValue, Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import {FaCircleExclamation, FaPlus, FaTrash} from "react-icons/fa6";
import React, {useEffect} from "react";
import {useFormState} from "react-dom";
import createLineItem from "@/app/invoices/actions/createLineItem";
import {I18nProvider} from "@react-aria/i18n";
import {removeLineItem, updateDueDate, updateInvoiceDate} from "@/app/invoices/[id]/actions/updateInvoice";
import {useRouter} from "next/navigation";

export default function InvoiceDisplay({invoice, products}: {
  invoice: Invoice & { lineItems: (LineItem & { product: Product })[], customer: Customer },
  products: Product[]
}) {
  const router = useRouter();
  const [formState, formAction] = useFormState(createLineItem.bind(null, invoice.id, products), {
    message: '',
    success: false
  })

  useEffect(() => {
    if (formState.message == '' && formState.success) {
      router.refresh()
    }
  }, [formState, router])

  return (
    <Card>
      <CardHeader className="flex-col gap-4 items-start">
        <div className="flex">
          <p className="text-4xl">{invoice.customer.name}</p>
        </div>
        <div className="w-full flex justify-between">
          <div>
            {invoice.customer.address.split('\n').map(l => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div className="items-end flex flex-col gap-2">
            <I18nProvider locale="en-NZ">
              <DatePicker label="Invoiced" labelPlacement="outside-left" className="w-min"
                          defaultValue={toCalendarDate(fromDate(invoice.invoiceDate, getLocalTimeZone()))}
                          onChange={v => updateInvoiceDate(invoice.id, v.toDate(getLocalTimeZone()))}
              />
              <DatePicker label="Due" labelPlacement="outside-left" className="w-min"
                          defaultValue={toCalendarDate(fromDate(invoice.dueDate, getLocalTimeZone()))}
                          onChange={v => updateDueDate(invoice.id, v.toDate(getLocalTimeZone()))}
              />
            </I18nProvider>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Table removeWrapper className="col-span-2">
          <TableHeader>
            <TableColumn>{""}</TableColumn>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>QUANTITY</TableColumn>
            <TableColumn align="end">SUBTOTAL</TableColumn>
          </TableHeader>
          <TableBody>
            {invoice.lineItems.flatMap((lineItem) => {
              return [(
                <TableRow key={lineItem.id}>
                  <TableCell><Button isIconOnly variant="light" color="danger" onPress={() => removeLineItem(lineItem.id).then(router.refresh())}><FaTrash /></Button></TableCell>
                  <TableCell>{lineItem.product.name}</TableCell>
                  <TableCell>${lineItem.product.price.toFixed(2)}</TableCell>
                  <TableCell>{lineItem.quantity}</TableCell>
                  <TableCell>${(lineItem.quantity * lineItem.product.price).toFixed(2)}</TableCell>
                </TableRow>
              )]
            })}
          </TableBody>
        </Table>
        <div className="flex justify-end items-center my-4 h-10 rounded-lg gap-4 bg-default-100">
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