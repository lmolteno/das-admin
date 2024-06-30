import prisma from "@/lib/prisma";
import { InvoicesTable } from "./invoices-table";

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (Number.isNaN(id)) {
    return undefined;
  }

  const customer = await prisma.customer.findFirst({ where: { id: id }, include: { invoices: true } })

  if (!customer) {
    return undefined;
  }

  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div>
        <p className="text-6xl">{customer.name}</p>
        <div className="ps-4 text-lg">
          {customer.address.split('\n').map(l => (<p key={l}>{l}</p>))}
        </div>
      </div>
      <InvoicesTable invoices={customer.invoices} customer={customer} />
    </div>
  );
}
