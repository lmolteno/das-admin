'use server'

import prisma from "@/lib/prisma";

async function editCustomer(customerId: number, state: { message: string, success: boolean }, formData: FormData) {
    const name = formData.get("name")?.toString();
    const address = formData.get("address")?.toString();
    const contactName = formData.get("contactName")?.toString()
    const email = formData.get("email")?.toString()

    if (!name || !address || !contactName || !email) {
        return { message: 'missing field', success: false };
    }

    const resultingCustomer = await prisma.customer.update({
        data: {
            name,
            address,
            contactName,
            email
        },
        where: {
            id: customerId
        }
    });

    return { message: '', success: true };
}

export default editCustomer;