/* eslint-disable no-console */
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  User,
  Select,
  SelectItem,
  cn,
} from "@nextui-org/react";

interface ApplyFertilizerProps {
  selectedFactory: string | null;
}

const fertilizers = [
  {
    name: "T750",
    price_pre_kilo: 150,
  },
  {
    name: "U236",
    price_pre_kilo: 150,
  },
  // Add more fertilizer objects as needed
];

const generateQuantityOptions = (max: number, step: number) => {
  const options = [];

  for (let i = step; i <= max; i += step) {
    options.push(i);
  }

  return options;
};

const ApplyFertilizer: React.FC<ApplyFertilizerProps> = ({
  selectedFactory,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFertilizers, setSelectedFertilizers] = React.useState<
    { name: string; quantity: number }[]
  >([]);

  const handleCheckboxChange = (name: string) => {
    setSelectedFertilizers((prevSelectedFertilizers) =>
      prevSelectedFertilizers.some((fertilizer) => fertilizer.name === name)
        ? prevSelectedFertilizers.filter(
            (fertilizer) => fertilizer.name !== name,
          )
        : [...prevSelectedFertilizers, { name, quantity: 25 }],
    );
  };

  const handleQuantityChange = (name: string, quantity: number) => {
    setSelectedFertilizers((prevSelectedFertilizers) =>
      prevSelectedFertilizers.map((fertilizer) =>
        fertilizer.name === name ? { ...fertilizer, quantity } : fertilizer,
      ),
    );
  };

  const quantityOptions = generateQuantityOptions(1500, 25);

  const getTotalCost = (name: string, quantity: number) => {
    const fertilizer = fertilizers.find(
      (fertilizer) => fertilizer.name === name,
    );

    return fertilizer ? fertilizer.price_pre_kilo * quantity : 0;
  };

  const handleAction = () => {
    const totalCost = selectedFertilizers.reduce((acc, fertilizer) => {
      const cost = getTotalCost(fertilizer.name, fertilizer.quantity);

      return acc + cost;
    }, 0);

    console.log("Selected Fertilizers:", selectedFertilizers);
    console.log("Total Cost:", totalCost);

    // Prepare data for Supabase
    const dataToPassToSupabase = selectedFertilizers.map((fertilizer) => ({
      factoryId: selectedFactory, // Include factory ID here
      name: fertilizer.name,
      quantity: fertilizer.quantity,
      cost: getTotalCost(fertilizer.name, fertilizer.quantity),
    }));

    console.log("Data to pass to Supabase:", dataToPassToSupabase);
    setTimeout(() => {
      onOpenChange(); // This will close the modal after 2 seconds
    }, 2000);
  };

  return (
    <>
      <Button
        className="rounded-3xl text-xl font-medium md:text-2xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 py-20 px-7 md:px-12 flex items-center gap-4 overflow-hidden"
        disabled={!selectedFactory} // Disable button if no factory is selected
        variant="bordered"
        onPress={onOpen}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs md:text-sm text-gray-500 text-center dark:text-gray-400">
            Click here to
          </span>
          <span className="flex items-center gap-2">
            {/* Add icon here if needed */}
            Apply Fertilizer
          </span>
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
                Apply Fertilizer
              </ModalHeader>
              <ModalBody>
                {fertilizers.map((fertilizer) => (
                  <div key={fertilizer.name}>
                    <Checkbox
                      aria-label={fertilizer.name}
                      classNames={{
                        base: cn(
                          "inline-flex w-full max-w-md bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black",
                          "hover:bg-content2 items-center justify-start",
                          "cursor-pointer rounded-lg gap-2 mb-0.5 p-4 border-2 border-transparent",
                          "data-[selected=true]:border-primary",
                        ),
                        label: "w-full",
                      }}
                      isSelected={selectedFertilizers.some(
                        (item) => item.name === fertilizer.name,
                      )}
                      onValueChange={() =>
                        handleCheckboxChange(fertilizer.name)
                      }
                    >
                      <div className="w-full flex justify-between gap-2">
                        <User
                          description={<p>Rs. {fertilizer.price_pre_kilo}</p>}
                          name={fertilizer.name}
                        />
                      </div>
                    </Checkbox>
                    {selectedFertilizers.some(
                      (item) => item.name === fertilizer.name,
                    ) && (
                      <div className="pl-10 mt-2">
                        <Select
                          placeholder="Select quantity"
                          value={
                            selectedFertilizers
                              .find((item) => item.name === fertilizer.name)
                              ?.quantity.toString() || "25"
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              fertilizer.name,
                              Number(e.target.value),
                            )
                          }
                        >
                          {quantityOptions.map((quantity) => (
                            <SelectItem
                              key={quantity}
                              value={quantity.toString()}
                            >
                              {quantity} kg
                            </SelectItem>
                          ))}
                        </Select>
                        <div className="mt-2 text-right">
                          <p>
                            Total Cost: Rs.
                            {getTotalCost(
                              fertilizer.name,
                              selectedFertilizers.find(
                                (item) => item.name === fertilizer.name,
                              )?.quantity || 0,
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleAction}>
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApplyFertilizer;
