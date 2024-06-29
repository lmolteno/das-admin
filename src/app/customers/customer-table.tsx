"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Tooltip, Button } from "@nextui-org/react";
import { Customer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import CustomerEditForm from "./customer-edit-form";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "address",
    label: "ADDRESS",
  },
  {
    key: "contactName",
    label: "CONTACT",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
]

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  const router = useRouter();

  return (
    <div>
      <p className="text-large">Customers</p>
      <Table aria-label="Table of customers">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={customers}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) =>
                columnKey != 'actions'
                  ? <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  : (<TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Details">
                        <Button isIconOnly variant="light" onPress={() => router.push(`/customers/${item.id}`)}>
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <FaEye />
                          </span>
                        </Button>
                      </Tooltip>
                      <CustomerEditForm customer={item} />
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
    </div>
  )
}