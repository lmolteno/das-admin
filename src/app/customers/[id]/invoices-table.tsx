"use client"

import { Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { Invoice } from "@prisma/client";
import router from "next/router";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";

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
    label: 'QUANTITY',
    key: 'quantity'
  },
]

export function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <Table aria-label="Table of invoices" removeWrapper>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={invoices}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) =>
              columnKey != 'actions'
                ? <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                : (<TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                      <Button isIconOnly variant="light" onPress={() => router.push(`/invoices/${item.id}`)}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <FaEye />
                        </span>
                      </Button>
                    </Tooltip>
                    <Tooltip content="Edit customer">
                      <Button isIconOnly variant="light">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <FaPencil />
                        </span>
                      </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete customer">
                      <Button isIconOnly variant="light">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <FaTrash />
                        </span>
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>)}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}