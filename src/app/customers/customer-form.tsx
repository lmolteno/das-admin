"use client";

import { SubmitButton } from "@/components/submit-button";
import { useDisclosure, Modal, Textarea, Button, Input, ModalContent, ModalFooter, ModalBody, ModalHeader, Card, CardBody } from "@nextui-org/react";
import createCustomer from "./actions/createCustomer";
import { useFormState } from "react-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialState = {
  message: '',
  success: false
}

export default function CustomerForm() {
  const [formState, formAction] = useFormState(createCustomer, initialState)
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose: manuallyClose } = useDisclosure();

  useEffect(() => {
    if (formState.message == '' && formState.success) {
      router.refresh()
      manuallyClose()
    }
  }, [formState, router, manuallyClose])

  return (
    <>
      <Button onPress={onOpen}>Create Customer</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">New Customer</ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-4">
                <Input type="text" name="name" label="Name" className="col-span-2" />
                <Input type="text" name="contactName" label="Contact Name" />
                <Input type="email" name="email" label="Email" />
                <Textarea
                  label="Address"
                  name="address"
                  placeholder="Customer Address"
                  className="col-span-2"
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
                <SubmitButton />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}