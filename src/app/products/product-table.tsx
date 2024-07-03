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
import deleteProduct from "@/app/products/actions/deleteProduct";
import {useRouter} from "next/navigation";

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

function ProductCell(columnKey: string, product: Product, refresh: () => void) {
  switch (columnKey) {
    case 'actions':
      return (
        <TableCell>
          <ProductEditForm product={product}/>
          <Tooltip color="danger" content="Delete product">
            <Button isIconOnly variant="light" onPress={() => deleteProduct(product.id).then(() => refresh())}>
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

export default function ProductsTable({products, allowCreation = false }: { products: Product[], allowCreation?: boolean }) {
  const router = useRouter()
  return (
    <Table aria-label="Table of products" bottomContent={allowCreation ? <div className="flex justify-end"><ProductForm/></div> : undefined}>
      <TableHeader columns={columns}>
        {(column) =>
          <TableColumn align={column.key == 'actions' ? 'end' : 'start'} key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => ProductCell(columnKey.toString(), item, router.refresh)}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}