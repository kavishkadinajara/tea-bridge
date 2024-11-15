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

import { createClient } from "@/lib/utils/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();

  const [factoryData, setFactoryData] = useState({ factoryName: "" });
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [supplierRequests, setSupplierRequests] = useState({
    accepted: 0,
    pending: 0,
  });
  const [teaLeafPrice, setTeaLeafPrice] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [isPriceUpdated, setIsPriceUpdated] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getUser();

        if (data.user) {
          setUserId(data.user.id || "");
        }
      } catch (error) {
        console.error("Error fetching session: ", error);
      }
    };

    const fetchFactory = async () => {
      try {
        if (userId) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles_factories")
            .select("factory_name, tea_leaf_price")
            .eq("id", userId)
            .single();

          if (profileError) throw profileError;

          setFactoryData({ factoryName: profileData?.factory_name || "" });
          setTeaLeafPrice(profileData?.tea_leaf_price || 0);
          setCurrentQuantity(897); // Set current quantity (mock data)
        }
      } catch (error) {
        console.error("Error fetching factory name: ", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        if (userId) {
          const { data: suppliersData, error: suppliersError } = await supabase
            .from("profiles_suppliers")
            .select("id")
            .eq("factory_id", userId);

          if (suppliersError) throw suppliersError;

          setTotalSuppliers(suppliersData?.length || 0);
        }
      } catch (error) {
        console.error("Error fetching total suppliers: ", error);
      }
    };

    const fetchSupplierRequests = async () => {
      try {
        if (userId) {
          const { data: acceptedRequests, error: acceptedError } =
            await supabase
              .from("suppliers_factories")
              .select("id")
              .eq("factory_id", userId)
              .eq("request_status", "Accepted");

          if (acceptedError) throw acceptedError;

          const { data: pendingRequests, error: pendingError } = await supabase
            .from("suppliers_factories")
            .select("id")
            .eq("factory_id", userId)
            .eq("request_status", "Pending");

          if (pendingError) throw pendingError;

          setSupplierRequests({
            accepted: acceptedRequests?.length || 0,
            pending: pendingRequests?.length || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching supplier requests: ", error);
      }
    };

    fetchSession().then(() => {
      fetchFactory();
      fetchSuppliers();
      fetchSupplierRequests();
    });
  }, [userId]);

  const updatePrice = async () => {
    try {
      const { error } = await supabase
        .from("profiles_factories")
        .update({ tea_leaf_price: teaLeafPrice })
        .eq("id", userId);

      if (error) throw error;

      setIsPriceUpdated(true);
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
          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md transition-shadow duration-300  shadow-cyan-600 hover:shadow-lime-600  hover:shadow-lg text-white font-semibold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10">
            <FaLeaf className="text-green-700 dark:text-green-400 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Current Total Quantity
              </h3>
              <p className="text-5xl font-bold text-green-700 dark:text-green-400 my-2">
                <CountUp duration={3.0} end={currentQuantity} start={0} /> KG
              </p>
            </div>
          </div>

          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md transition-shadow duration-300  shadow-cyan-600 hover:shadow-lime-600  hover:shadow-lg text-white font-semibold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10">
            <FaLeaf className="text-green-700 dark:text-green-400 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Total Suppliers
              </h3>
              <p className="text-5xl font-bold text-green-700 dark:text-green-400 my-2">
                <CountUp
                  duration={3.0}
                  end={supplierRequests.accepted}
                  start={0}
                />
              </p>
            </div>
          </div>

          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md transition-shadow duration-300  shadow-cyan-600 hover:shadow-lime-600  hover:shadow-lg text-white font-semibold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10">
            <FaLeaf className="text-green-700 dark:text-green-400 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Supplier Requests
              </h3>
              <p className="text-5xl font-bold text-green-700 dark:text-green-400 my-2">
                <CountUp
                  duration={3.0}
                  end={supplierRequests.pending}
                  start={0}
                />
              </p>
            </div>
          </div>

          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md transition-shadow duration-300  shadow-cyan-600 hover:shadow-lime-600  hover:shadow-lg text-white font-semibold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10">
            <div className="mr-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Set Tea Leaf Price
              </h3>
              <p className="text-4xl font-bold text-green-700 dark:text-green-400 my-2">
                Rs. {teaLeafPrice}
              </p>
              {isPriceUpdated && (
                <span className="text-green-500 font-medium">
                  Price updated successfully!
                </span>
              )}
            </div>
            <Button color="success" size="sm" onClick={onOpen}>
              Update Price
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <Link
            className="w-full lg:w-1/2 px-4 py-2 border-cyan-600 hover:border-lime-500 border-2 shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10 text-center"
            href="/tea-factory/suppliers"
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
                <Button color="danger" variant="light" onClick={onClose}>
                  Cancel
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
