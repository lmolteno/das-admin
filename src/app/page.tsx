import {HeaderText} from "@/components/header-text";
import prisma from "@/lib/prisma";
import InvoiceTable from "@/app/invoices/invoice-table";
import CustomerTable from "@/app/customers/customer-table";
import ProductsTable from "@/app/products/product-table";
import InvoiceForm from "@/app/invoices/invoice-form";
import ProductForm from "@/app/products/product-form";
import CustomerForm from "@/app/customers/customer-form";
import InvoiceTemplateForm from "@/app/invoice-templates/invoice-template-form";
import InvoiceTemplateTable from "@/app/invoice-templates/invoice-template-table";


export default async function Home() {
  const invoices = await prisma.invoice.findMany()
  const invoiceTemplates = await prisma.invoiceTemplate.findMany()
  const customers = await prisma.customer.findMany()
  const products = await prisma.product.findMany()

  return (
    <div className="w-full max-w-screen-lg">
      <HeaderText>Home</HeaderText>
      <div className="flex flex-col gap-8 w-full">
        <div>
          <div className="flex justify-between items-center pb-2 text-xl">
            <h3>Invoices</h3>
            <InvoiceForm customers={customers} templates={invoiceTemplates}/>
          </div>
          <InvoiceTable templates={invoiceTemplates} invoices={invoices} customers={customers}/>
        </div>
        <div>
          <div className="flex justify-between items-center pb-2 text-xl">
            <h3>Customers</h3>
            <CustomerForm/>
          </div>
          <CustomerTable customers={customers}/>
        </div>
        <div>
          <div className="flex justify-between items-center pb-2 text-xl">
            <h3>Products</h3>
            <ProductForm/>
          </div>
          <ProductsTable products={products}/>
        </div>
        <div>
          <div className="flex justify-between items-center pb-2 text-xl">
            <h3>Invoice Templates</h3>
            <InvoiceTemplateForm />
          </div>
          <InvoiceTemplateTable invoiceTemplates={invoiceTemplates} />
        </div>
      </div>
    </div>
  )
}