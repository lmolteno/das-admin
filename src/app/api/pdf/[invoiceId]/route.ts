"use server"

import * as fs from 'fs';
import { formatDate } from 'date-fns';
import sanitizeHtml from 'sanitize-html';

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const dateFormat = (date: Date) => formatDate(date, 'MMM d, yyyy');

async function* nodeStreamToIterator(stream: fs.ReadStream) {
  for await (const chunk of stream) {
    yield new Uint8Array(chunk);
  }
}

function iteratorToStream(iterator: AsyncIterator<any>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

function streamFile(path: string): ReadableStream {
  const nodeStream = fs.createReadStream(path);
  return iteratorToStream(nodeStreamToIterator(nodeStream))
}

export const GET = async (request: Request, params: { invoiceId: number }) => {
  const invoice = await prisma.invoice.findFirst({
    where: { id: params.invoiceId },
    include: {
      lineItems: {
        include: { product: true }
      },
      template: true,
      customer: true,
    }
  });

  if (invoice === null) {
    return { success: false }
  }

  try {
    const html = fs.readFileSync(process.cwd() + '/weasyprint/invoice.html').toString()
    const filledTemplate = html
      .replace("{{fromAddress}}", invoice.template.fromAddress)
      .replace("{{toAddress}}", invoice.customer.address)
      .replace("{{invoiceNumber}}", invoice.id.toString())
      .replace("{{invoiceDate}}", dateFormat(invoice.invoiceDate))
      .replace("{{dueDate}}", dateFormat(invoice.dueDate))
      .replace("{{paymentInfo}}",
        Object.entries(JSON.parse(invoice.template.paymentInstructions?.toString() ?? '{}'))
          .map(([k, v]) => `<dt>${k}</dt><dd> ${v}</dd>`).join("\n"))
      .replace("{{lineItems}}",
        invoice.lineItems.map(lineItem => (
          `<tr>
            <td>${lineItem.product.name}</td>
            <td>&dollar;${lineItem.product.price.toFixed(2)}</td>
            <td>${lineItem.quantity}</td>
            <td>&dollar;${(lineItem.quantity * lineItem.product.price).toFixed(2)}</td>
            </tr>
          `
        )).join('\n'))
      .replace("{{totalDue}}",
        "&dollar;" + invoice.lineItems
          .reduce((s, l) => s + (l.product.price * l.quantity), 0).toFixed(2)
      )

    require('child_process').execSync(`cd weasyprint && echo "${sanitizeHtml(filledTemplate)}" | weasyprint - output.pdf`, { encoding: "utf-8" })

    return new NextResponse(streamFile("weasyprint/output.pdf"), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-": "application/pdf",
        "Content-Disposition": `attachment; filename="${formatDate(invoice.dueDate, "yyyyMMdd")}_${invoice.customer.name.toLowerCase().replace(" ", "")}.pdf"`
      }
    })

  } catch {
    return { success: false }
  }
}
