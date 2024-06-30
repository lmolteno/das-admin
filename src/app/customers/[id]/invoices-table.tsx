"use client"

import {
  Button,
  Card, CardBody, CardHeader,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from "@nextui-org/react";
import {Customer, Invoice } from "@prisma/client";
import router from "next/router";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import {useRouter} from "next/navigation";
import InvoiceForm from "@/app/invoices/invoice-form";

const columns = [
  {
    label: 'DATE',
    key: 'invoiceDate'
  },
  {
    label: 'DUE',
    key: 'dueDate'
  },
  {
    label: 'PAID',
    key: 'paid'
  },
]

export function InvoicesTable({ invoices, customer  }: { invoices: Invoice[], customer: Customer }) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <div className="w-full flex flex-row justify-between">
          <p className="text-4xl">Invoices</p>
          <InvoiceForm customers={[customer]} />
        </div>
      </CardHeader>
      <CardBody>
        <Table aria-label="Table of invoices" removeWrapper onRowAction={id => router.push(`/invoices/${id}`)}>
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={invoices}>
            {(item) => {
              return (
                <TableRow key={item.id} className="hover:bg-foreground-100 hover:cursor-pointer transition-background">
                  <TableCell className="rounded-s-lg">{item.invoiceDate.toLocaleDateString()}</TableCell>
                  <TableCell>{item.dueDate.toLocaleDateString()}</TableCell>
                  <TableCell className="rounded-e-lg">{item.paid ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              )}
            }
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}