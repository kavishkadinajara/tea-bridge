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
import Link from "next/link";
import { User } from "next-auth";

import { createClient } from "@/lib/utils/supabase/client";

type SessionState = { user: User } | null;

export default function DashboardPage() {
  const supabase = createClient();

  // State to hold factory data
  const [factoryData, setFactoryData] = useState({
    factoryName: "",
  });

  // State to hold current quantity of tea leaves
  const [currentQuantity, setCurrentQuantity] = useState(0);

  // State to hold total number of suppliers
  const [totalSuppliers, setTotalSuppliers] = useState(0);

  // State to hold number of supplier requests
  const [supplierRequests, setSupplierRequests] = useState(0);

  // Modal control
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State to hold tea leaf price
  const [teaLeafPrice, setTeaLeafPrice] = useState<number>(0);

  // State to hold session information
  const [session, setSession] = useState<SessionState>(null);

  // State to hold user type
  const [userType, setUserType] = useState<string>("");

  // State to hold user ID
  const [userId, setUserId] = useState<string>("");

  // State to show success message
  const [isPriceUpdated, setIsPriceUpdated] = useState(false);

  // Fetch factory data and session information on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getUser();

        if (data.user) {
          setSession({ user: data.user });
          setUserId(data.user.id || "");
          setUserType(data.user.user_metadata?.userType || "");
          console.log("User Type: ", userType);
          console.log("User ID: ", userId);
        }
      } catch (error) {
        console.error("Error fetching session: ", error);
      }
    };

    const fetchFactory = async () => {
      try {
        if (userId) {
          // Ensure userId is available
          // Fetch factory name from the database
          const { data: profileData, error: profileError } = await supabase
            .from("profiles_factories")
            .select("factory_name, tea_leaf_price") // Fetch tea_leaf_price as well
            .eq("id", userId)
            .single();

          if (profileError) throw profileError;

          setFactoryData({
            factoryName: profileData?.factory_name || "",
          });
          setTeaLeafPrice(profileData?.tea_leaf_price || 0); // Initialize tea_leaf_price
          setCurrentQuantity(897); // Set current quantity (mock data)
          setTotalSuppliers(10519); // Set total suppliers (mock data)
          setSupplierRequests(102); // Set supplier requests (mock data)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching factory name: ", error.message);
        }
      }
    };

    fetchSession().then(fetchFactory);
  }, [userId]);

  const updatePrice = async () => {
    try {
      const { error } = await supabase
        .from("profiles_factories")
        .update({ tea_leaf_price: teaLeafPrice })
        .eq("id", userId);

      if (error) throw error;

      console.log("Price updated successfully");
      setIsPriceUpdated(true);

      // Hide the success message after 3 seconds
      setTimeout(() => setIsPriceUpdated(false), 3000);
    } catch (error) {
      console.error("Error updating price: ", error);
    }
  };

  return (
    <div className="w-full h-full lg:p-8">
      <div className="container mx-auto bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          {factoryData.factoryName} Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Current Total Quantity Card */}
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

          {/* Total Suppliers Card */}
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

          {/* Supplier Requests Card */}
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

          {/* Set Tea Leaf Price Card */}
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
              {isPriceUpdated && (
                <span className="text-green-500 font-medium">
                  Price updated successfully!
                </span>
              )}
            </div>

            <div className="flex-shrink-0">
              <Button color="success" size="sm" onClick={onOpen}>
                Update Price
              </Button>
            </div>
          </div>
        </div>

        {/* View Suppliers Link */}
        <div className="flex flex-col items-center justify-center py-6">
          <Link
            className="w-full lg:w-1/2 px-4 py-2 border-cyan-600 hover:border-lime-500 border-2 shadow-md shadow-cyan-600 hover:shadow-lime-600 rounded-lg text-center text-white font-semibold transition duration-300"
            href="/suppliers"
          >
            View Suppliers
          </Link>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold">
                Update Tea Leaf Price
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Tea Leaf Price"
                  placeholder="Enter new price"
                  type="number"
                  value={teaLeafPrice.toString()}
                  onChange={(e) => setTeaLeafPrice(parseFloat(e.target.value))}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="success"
                  onClick={() => {
                    updatePrice();
                    onClose();
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
