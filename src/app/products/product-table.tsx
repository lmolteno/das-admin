"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Tooltip, Button, Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { Customer, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import ProductEditForm from "./product-edit-form";
import ProductForm from "./product-form";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "price",
    label: "PRICE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
]

function ProductCell(columnKey: string, product: Product) {
  switch (columnKey) {
    case 'actions':
      return (
        <TableCell>
          <ProductEditForm product={product} />
          <Tooltip color="danger" content="Delete product">
            <Button isIconOnly variant="light">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FaTrash />
              </span>
            </Button>
          </Tooltip>
        </TableCell>)
    case 'price':
      return <TableCell>{'$' + product.price.toFixed(2)}</TableCell>
    default:
      return <TableCell>{getKeyValue(product, columnKey)}</TableCell>
  }
}

export default function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex flex-row justify-between">
          <p className="text-4xl">Products</p>
          <ProductForm />
        </div>
      </CardHeader>
      <CardBody>
        <Table aria-label="Table of products" removeWrapper>
          <TableHeader columns={columns}>
            {(column) => <TableColumn align={column.key == 'actions' ? 'end' : 'start'} key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={products}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => ProductCell(columnKey.toString(), item)}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}