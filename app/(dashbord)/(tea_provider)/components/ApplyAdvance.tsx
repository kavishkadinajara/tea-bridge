import React, { useState } from "react";
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

// Define the type for props
interface ApplyAdvanceProps {
  selectedFactory: string | null;
}

const ApplyAdvance: React.FC<ApplyAdvanceProps> = ({ selectedFactory }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);

  return (
    <>
      <Button
        className="rounded-3xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 py-6 px-7"
        variant="bordered"
        onPress={onOpen}
      >
        Apply Advance
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
                Apply Advance
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <Input
                    label="Enter the amount you expect"
                    labelPlacement="outside"
                    max={50000}
                    min={0}
                    placeholder="0"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">Rs.</span>
                      </div>
                    }
                    type="number"
                    value={advanceAmount.toString()} // Ensure the value is a string
                    onChange={(e) => setAdvanceAmount(Number(e.target.value))} // Convert input value to number
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
};

export default ApplyAdvance;
