"use client";

import { SubmitButton } from "@/components/submit-button";
import { useDisclosure, Modal, Textarea, Button, Input, ModalContent, ModalFooter, ModalBody, ModalHeader, Card, CardBody, Tooltip } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { FaCircleExclamation, FaPencil } from "react-icons/fa6";
import { Customer } from "@prisma/client";
import editCustomer from "./actions/editCustomer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  message: ''
}

export default function CustomerEditForm({ customer }: { customer: Customer }) {
  const [formState, formAction] = useFormState(editCustomer.bind(null, customer.id), initialState)
  const { isOpen, onOpen, onOpenChange, onClose: manuallyClose } = useDisclosure();
  const router = useRouter()

  useEffect(() => {
    if (formState.message == '' && formState.success) {
      router.refresh()
      manuallyClose()
    }
  }, [formState, router, manuallyClose])

  return (
    <>
      <Tooltip content="Edit customer">
        <Button isIconOnly variant="light" onPress={onOpen}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <FaPencil />
          </span>
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">Edit Customer</ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-4">
                <Input type="text" name="name" label="Name" className="col-span-2" defaultValue={customer.name} />
                <Input type="text" name="contactName" label="Contact Name" defaultValue={customer.contactName} />
                <Input type="email" name="email" label="Email" defaultValue={customer.email} />
                <Textarea
                  label="Address"
                  name="address"
                  placeholder="Customer Address"
                  className="col-span-2"
                  defaultValue={customer.address}
                />
                {formState.message && (
                  <Card className="col-span-2 bg-red-200">
                    <CardBody className="flex flex-row gap-4">
                      <FaCircleExclamation />
                      {formState.message}
                    </CardBody>
                  </Card>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <SubmitButton text="Save" />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}