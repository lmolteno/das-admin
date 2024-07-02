"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { InvoiceTemplate} from "@prisma/client";
import { useRouter } from "next/navigation";
import InvoiceTemplateForm from "@/app/invoice-templates/invoice-template-form";

const columns = [
  {
    label: 'NAME',
    key: 'name'
  },
  {
    label: 'ADDRESS',
    key: 'fromAddress'
  },
]

export default function InvoiceTemplateTable({ invoiceTemplates, allowCreation = false }: { invoiceTemplates: InvoiceTemplate[], allowCreation?: boolean }) {
  const router = useRouter();
  return (
     <Table
       aria-label="Table of invoices" onRowAction={id => router.push(`/invoices/${id}`)}
       bottomContent={allowCreation ? <div className="flex justify-end"><InvoiceTemplateForm /></div> : undefined}
     >
       <TableHeader columns={columns}>
         {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
       </TableHeader>
       <TableBody items={invoiceTemplates}>
         {(item) => {
           return (
               <TableRow key={item.id} className="hover:bg-foreground-100 hover:cursor-pointer transition-background rounded-lg">
                 <TableCell className="rounded-s-lg">{item.name}</TableCell>
                 <TableCell>{item.fromAddress}</TableCell>
               </TableRow>
         )}
         }
       </TableBody>
     </Table>
  )
}