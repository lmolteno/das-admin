"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {Customer, Invoice, InvoiceTemplate} from "@prisma/client";
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

export function InvoicesTable({invoices, customer, templates }: { invoices: Invoice[], customer: Customer, templates: InvoiceTemplate[] }) {
  const router = useRouter();
  return (
    <div>
      <div className="w-full flex flex-row px-6 justify-between mb-4">
        <p className="text-4xl">Invoices</p>
        <InvoiceForm customers={[customer]} templates={templates} />
      </div>
      <Table aria-label="Table of invoices" onRowAction={id => router.push(`/invoices/${id}`)}>
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
            )
          }
          }
        </TableBody>
      </Table>
    </div>
  )
}