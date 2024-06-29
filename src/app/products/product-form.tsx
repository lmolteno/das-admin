"use client";

import { SubmitButton } from "@/components/submit-button";
import { useDisclosure, Modal, Textarea, Button, Input, ModalContent, ModalFooter, ModalBody, ModalHeader, Card, CardBody } from "@nextui-org/react";
import createProduct from "./actions/createProduct";
import { useFormState } from "react-dom";
import { FaCircleExclamation, FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialState = {
  message: '',
  success: false
}

export default function ProductForm() {
  const [formState, formAction] = useFormState(createProduct, initialState)
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
      <Button color="primary" onPress={onOpen} startContent={<FaPlus />}>
        Create Product
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">New Product</ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-4">
                <Input type="text" name="name" label="Name" />
                <Input type="number" name="price" label="Price" />
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