import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";

export default function ApplyTeaPowder() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="rounded-3xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 py-6 px-7 "
        variant="bordered"
        onPress={onOpen}
      >
        Apply TeaPowder
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Apply Tea Powder
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <Input
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">KG</span>
                      </div>
                    }
                    label="Enter number of KG"
                    labelPlacement="outside"
                    max={50}
                    min={0}
                    placeholder="0"
                    type="number"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
