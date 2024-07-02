"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import {Customer, Invoice, InvoiceTemplate} from "@prisma/client";
import InvoiceForm from "@/app/invoices/invoice-form";
import { useRouter } from "next/navigation";

const columns = [
  {
    label: 'CUSTOMER',
    key: 'customer.name'
  },
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

export default function InvoiceTable({ invoices, customers, templates, allowCreation = false }: { invoices: Invoice[], customers: Customer[], templates: InvoiceTemplate[], allowCreation?: boolean }) {
  const router = useRouter();
  return (
     <Table
       aria-label="Table of invoices" onRowAction={id => router.push(`/invoices/${id}`)}
       bottomContent={allowCreation ? <div className="flex justify-end"><InvoiceForm customers={customers} templates={templates} /></div> : undefined}
     >
       <TableHeader columns={columns}>
         {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
       </TableHeader>
       <TableBody items={invoices}>
         {(item) => {
           const customer = customers.find(c => c.id === item.customerId)
           return (
               <TableRow key={item.id} className="hover:bg-foreground-100 hover:cursor-pointer transition-background rounded-lg">
                 <TableCell className="rounded-s-lg">{customer?.name}</TableCell>
                 <TableCell>{item.invoiceDate.toLocaleDateString()}</TableCell>
                 <TableCell>{item.dueDate.toLocaleDateString()}</TableCell>
                 <TableCell className="rounded-e-lg">{item.paid ? 'Yes' : 'No'}</TableCell>
               </TableRow>
         )}
         }
       </TableBody>
     </Table>
  )
}