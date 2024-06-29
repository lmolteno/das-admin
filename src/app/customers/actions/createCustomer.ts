'use server'

import prisma from "@/lib/prisma";

async function createCustomer(state: { message: string, success: boolean }, formData: FormData) {
    const name = formData.get("name")?.toString();
    const address = formData.get("address")?.toString();
    const contactName = formData.get("contactName")?.toString()
    const email = formData.get("email")?.toString()

    if (!name || !address || !contactName || !email) {
        return { message: 'missing field', success: false };
    }

    const resultingCustomer = await prisma.customer.create({
        data: {
            name,
            address,
            contactName,
            email
        }
    });

    return { message: '', success: true };
}

export default createCustomer;