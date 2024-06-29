import prisma from "@/lib/prisma";
import ProductsTable from "./product-table";
import ProductForm from "./product-form";

async function getData() {
  const products = await prisma.product.findMany()
  return products;
}

export default async function Customers() {
  const products = await getData()

  return (
    <div className="container mx-auto">
      <ProductsTable products={products} />
    </div>
  );
}
