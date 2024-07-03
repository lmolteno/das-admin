"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Button,
} from "@nextui-org/react";
import {Customer} from "@prisma/client";
import {useRouter} from "next/navigation";
import { FaTrash } from "react-icons/fa6";
import CustomerEditForm from "./customer-edit-form";
import CustomerForm from "./customer-form";
import {deleteCustomer} from "./actions/deleteCustomer";
import {useCallback} from "react";

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

function CustomerDeleteButton({ customer }: { customer: Customer }) {
  const router = useRouter();

  const action = useCallback(() => {
    deleteCustomer(customer.id)
      .then((r) => {
          if (r.success) {
            router.refresh()
          } else {
            alert(r.message)
          }
        }
      )
  }, [customer, router])

  return <Tooltip color="danger" content="Delete customer">
    <Button
      isIconOnly
      variant="light"
      onPress={() => action()}>
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <FaTrash/>
        </span>
    </Button>
  </Tooltip>;
}

export default function CustomerTable({ customers, allowCreation = false }: { customers: Customer[], allowCreation?: boolean }) {
  const router = useRouter();

  return (
    <Table aria-label="Table of customers" bottomContent={allowCreation ? <div className="flex justify-end"><CustomerForm/></div> : undefined}
           onRowAction={(row) => router.push(`/customers/${row}`)}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn align={column.key == 'actions' ? 'end' : 'start'}
                                  key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={customers}>
        {(item) => (
          <TableRow key={item.id}
                    className="hover:bg-foreground-100 hover:cursor-pointer transition-background rounded-lg">
            {(columnKey) =>
              columnKey != 'actions'
                ? <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                : (<TableCell>
                  <div className="relative flex items-center justify-end gap-2">
                    <CustomerEditForm customer={item}/>
                    <CustomerDeleteButton customer={item}/>
                  </div>
                </TableCell>)}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}