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
import { FaDollarSign } from "react-icons/fa"; // Import an icon

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
        className="rounded-3xl text-xl font-medium md:text-2xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 px-7 md:px-12 py-20 flex flex-col items-center gap-1"
        variant="bordered"
        onPress={onOpen}
      >
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Click here to
        </span>
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-green-700 dark:text-green-400 text-2xl" />
          <span>Apply Advance</span>
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
