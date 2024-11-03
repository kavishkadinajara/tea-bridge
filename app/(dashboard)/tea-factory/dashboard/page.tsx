/* eslint-disable no-console */
"use client";
import React, { useState, useEffect } from "react";
import { FaLeaf } from "react-icons/fa";
import CountUp from "react-countup";
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

import { createClient } from "@/lib/utils/supabase/client";

interface MyDashboardProps {
  userId: string;
  setActiveComponent: (component: string) => void; // Add this prop to allow tab switching
}

const MyDashboard: React.FC<MyDashboardProps> = ({
  userId,
  setActiveComponent,
}) => {
  const supabase = createClient();

  const [factoryData, setFactoryData] = useState({
    factoryName: "",
  });
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [supplierRequests, setSupplierRequests] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [teaLeafPrice, setTeaLeafPrice] = useState<number>(0);

  useEffect(() => {
    const fetchFactory = async () => {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles_factories")
          .select("factory_name")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;

        const fetchFactoryName = {
          factoryName: profileData?.factory_name || "",
        };

        setFactoryData(fetchFactoryName);
        setCurrentQuantity(897);
        setTotalSuppliers(10519);
        setSupplierRequests(102);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching factory name: ", error.message);
        }
      }
    };

    fetchFactory();
  }, [userId]);

  return (
    <div className="w-full h-full lg:p-8">
      <div className="container mx-auto bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          {factoryData.factoryName} Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg">
            <FaLeaf className="text-green-700 dark:text-green-400 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Current Total Quantity
              </h3>
              <p className="text-5xl font-bold text-green-700 dark:text-green-400 my-2">
                <CountUp duration={3.0} end={currentQuantity} start={0} /> KG
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                As of today
              </span>
            </div>
          </div>

          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg">
            <FaLeaf className="text-green-700 dark:text-green-400 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Total Suppliers
              </h3>
              <p className="text-5xl font-bold text-green-700 dark:text-green-400 my-2">
                <CountUp duration={3.0} end={totalSuppliers} start={0} />
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Across all regions
              </span>
            </div>
          </div>

          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg">
            <FaLeaf className="text-green-700 dark:text-green-400 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Supplier Requests
              </h3>
              <p className="text-5xl font-bold text-green-700 dark:text-green-400 my-2">
                <CountUp duration={3.0} end={supplierRequests} start={0} />
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Pending approvals
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg">
            <div className="mr-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Set Tea Leaf Price
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Per KG rate
              </p>
              <p className="text-4xl font-bold text-green-700 dark:text-green-400 my-2">
                Rs. {teaLeafPrice}
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button color="success" size="sm" onClick={onOpen}>
                Update Price
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <button
            className="w-full lg:w-1/2 px-4 py-2 border-cyan-600 hover:border-lime-500 border-2 shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10"
            onClick={() => setActiveComponent("Suppliers")}
          >
            View Suppliers
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-bold">
                Set Tea Leaf Price
              </ModalHeader>
              <ModalBody>
                <Input
                  required
                  label="Price per KG"
                  placeholder="Enter price per KG"
                  type="number"
                  value={teaLeafPrice.toString()}
                  onChange={(e) => setTeaLeafPrice(parseInt(e.target.value))}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="font-bold"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button className="font-bold" color="primary" onPress={onClose}>
                  Save Price
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyDashboard;
