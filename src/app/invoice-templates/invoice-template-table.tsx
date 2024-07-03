"use client";

import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip} from "@nextui-org/react";
import {InvoiceTemplate} from "@prisma/client";
import {useRouter} from "next/navigation";
import InvoiceTemplateForm from "@/app/invoice-templates/invoice-template-form";
import deleteProduct from "@/app/products/actions/deleteProduct";
import {FaTrash} from "react-icons/fa6";
import deleteInvoiceTemplate from "@/app/invoice-templates/actions/deleteInvoiceTemplate";

const columns = [
  {
    label: 'NAME',
    key: 'name'
  },
  {
    label: 'ADDRESS',
    key: 'fromAddress'
  },
  {
    label: 'ACTIONS',
    key: 'fromAddress'
  },
]

export default function InvoiceTemplateTable({invoiceTemplates, allowCreation = false}: {
  invoiceTemplates: InvoiceTemplate[],
  allowCreation?: boolean
}) {
  const router = useRouter();
  return (
    <Table
      aria-label="Table of invoices" onRowAction={id => router.push(`/invoices/${id}`)}
      bottomContent={allowCreation ? <div className="flex justify-end"><InvoiceTemplateForm/></div> : undefined}
    >
      <TableHeader columns={columns}>
        {(column) =>
          <TableColumn align={column.key == 'actions' ? 'end' : 'start'} key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={invoiceTemplates}>
        {(item) => {
          return (
            <TableRow key={item.id} className="hover:bg-foreground-100 hover:cursor-pointer transition-background rounded-lg">
              <TableCell className="rounded-s-lg">{item.name}</TableCell>
              <TableCell>{item.fromAddress}</TableCell>
              <TableCell>
                <Tooltip color="danger" content="Delete template">
                  <Button isIconOnly variant="light" onPress={() => deleteInvoiceTemplate(item.id).then(router.refresh)}>
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <FaTrash/>
                    </span>
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          )
        }
        }
      </TableBody>
    </Table>
  )
}