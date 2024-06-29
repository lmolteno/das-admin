"use client";

import {SubmitButton} from "@/components/submit-button";
import {
  useDisclosure,
  Modal,
  Button,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Card,
  CardBody,
  Autocomplete,
  AutocompleteItem
} from "@nextui-org/react";
import {useFormState} from "react-dom";
import {FaCircleExclamation, FaPlus} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import createInvoice from "./actions/createInvoice";
import { Customer } from "@prisma/client";

const initialState = {
  message: '',
  success: false,
  invoiceId: undefined
}

export default function InvoiceForm({ customers }: { customers: Customer[] }) {
  const [formState, formAction] = useFormState(createInvoice.bind(null, customers), initialState)
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange, onClose: manuallyClose} = useDisclosure();

  useEffect(() => {
    if (formState.message == '' && formState.success && formState.invoiceId !== undefined) {
      router.push(`/invoices/${formState.invoiceId}`)
      manuallyClose()
    }
  }, [formState, router, manuallyClose])

  return (
    <>
      <Button color="primary" onPress={onOpen} startContent={<FaPlus/>}>
        Create Invoice
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">New Invoice</ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-4">
                <Autocomplete items={customers} label="Customer" name="customer" placeholder="Select customer" className="col-span-2">
                  {(customer) => <AutocompleteItem key={customer.id}>{customer.name}</AutocompleteItem>}
                </Autocomplete>
                {formState.message && (
                  <Card className="col-span-2 bg-red-200">
                    <CardBody className="flex flex-row gap-4">
                      <FaCircleExclamation/>
                      {formState.message}
                    </CardBody>
                  </Card>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <SubmitButton/>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}