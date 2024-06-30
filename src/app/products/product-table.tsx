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
  Button
} from "@nextui-org/react";
import {Product} from "@prisma/client";
import {FaTrash} from "react-icons/fa6";
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
          <ProductEditForm product={product}/>
          <Tooltip color="danger" content="Delete product">
            <Button isIconOnly variant="light">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FaTrash/>
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

export default function ProductsTable({products}: { products: Product[] }) {
  return (
    <Table aria-label="Table of products" bottomContent={<div className="flex justify-end"><ProductForm/></div>}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn align={column.key == 'actions' ? 'end' : 'start'}
                                  key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => ProductCell(columnKey.toString(), item)}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}