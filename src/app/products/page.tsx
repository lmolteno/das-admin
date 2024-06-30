import prisma from "@/lib/prisma";
import ProductsTable from "./product-table";
import {HeaderText} from "@/components/header-text";

export default async function Customers() {
  const products = await prisma.product.findMany()

  return (
    <div className="container mx-auto">
      <HeaderText><h1>Products</h1></HeaderText>
      <ProductsTable products={products} />
    </div>
  );
}
