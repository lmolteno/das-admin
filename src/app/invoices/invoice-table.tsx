"use client";

import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip} from "@nextui-org/react";
import {Customer, Invoice, InvoiceTemplate} from "@prisma/client";
import InvoiceForm from "@/app/invoices/invoice-form";
import { useRouter } from "next/navigation";
import deleteProduct from "@/app/products/actions/deleteProduct";
import {FaTrash} from "react-icons/fa6";
import {deleteInvoice} from "@/app/invoices/[id]/actions/updateInvoice";

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
  {
    label: 'ACTIONS',
    key: 'actions'
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
         {(column) =>
           <TableColumn align={column.key == 'actions' ? 'end' : 'start'} key={column.key}>{column.label}</TableColumn>}
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
                 <TableCell>
                 <Tooltip color="danger" content="Delete invoice">
                   <Button isIconOnly variant="light" onPress={() => deleteInvoice(item.id).then(router.refresh)}>
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <FaTrash/>
                      </span>
                   </Button>
                 </Tooltip>
                 </TableCell>
               </TableRow>
         )}
         }
       </TableBody>
     </Table>
  )
}