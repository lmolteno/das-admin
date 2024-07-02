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
  Input, Textarea
} from "@nextui-org/react";
import {useFormState} from "react-dom";
import {FaCircleExclamation, FaPlus} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import createInvoiceTemplate from "./actions/createInvoiceTemplate";

const initialState = {
  message: '',
  success: false
}

export default function InvoiceTemplateForm() {
  const [formState, formAction] = useFormState(createInvoiceTemplate, initialState)
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange, onClose: manuallyClose} = useDisclosure();

  useEffect(() => {
    if (formState.message == '' && formState.success) {
      router.refresh()
      manuallyClose()
    }
  }, [formState, router, manuallyClose])

  return (
    <>
      <Button color="primary" onPress={onOpen} startContent={<FaPlus/>}>
        Create Invoice Template
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">New Template</ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-4">
                <Input label="Name" name="name" className="col-span-2" />
                <Textarea label="Payment Instructions" name="payment" className="col-span-2" />
                <Textarea label="From Address" name="address" className="col-span-2" />
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