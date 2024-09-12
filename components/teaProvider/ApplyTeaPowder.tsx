/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { FaLeaf } from "react-icons/fa"; // Import the icon

// Define the type for props
interface ApplyTeaPowderProps {
  selectedFactory: string | null;
}

const ApplyTeaPowder: React.FC<ApplyTeaPowderProps> = ({ selectedFactory }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [amount, setAmount] = useState<number>(0);

  return (
    <>
      <Button
        className="rounded-3xl text-xl font-medium md:text-2xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 px-7 md:px-12 py-20 flex flex-col items-center gap-1"
        variant="bordered"
        onPress={onOpen}
      >
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Click here to
        </span>
        <div className="flex items-center gap-2">
          <FaLeaf className="text-green-700 dark:text-green-400 text-2xl" />{" "}
          {/* Icon added here */}
          <span>Apply Tea Powder</span>
        </div>
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
                    value={amount.toString()} // Ensure the value is a string
                    onChange={(e) => setAmount(Number(e.target.value))} // Convert input value to number
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

export default ApplyTeaPowder;
