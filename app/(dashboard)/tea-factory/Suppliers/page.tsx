/* eslint-disable no-console */
"use client";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Badge,
  Input,
} from "@nextui-org/react";
import { motion } from "framer-motion"; // For animations

import { createClient } from "@/lib/utils/supabase/client";

interface Supplier {
  id: string;
  full_name: string;
  status: string;
  profile_photo: string;
  teaNumber?: string;
  requestDatetime?: string;
  telephone?: string;
  address?: string;
  town?: string;
}

export default function Suppliers() {
  const supabase = createClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingSuppliers, setPendingSuppliers] = useState<Supplier[]>([]);
  const [currentSuppliers, setCurrentSuppliers] = useState<Supplier[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch suppliers from the database on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getUser();

        if (data.user) {
          setUserId(data.user.id);
        }
      } catch (error) {
        console.error("Error fetching session: ", error);
      }
    };

    const fetchSuppliers = async () => {
      if (!userId) {
        console.warn("User ID is not set. Skipping supplier fetch.");

        return;
      }

      try {
        // Fetch pending suppliers
        const { data: pending, error: pendingError } = await supabase
          .from("suppliers_factories")
          .select("supplier_id")
          .eq("factory_id", userId)
          .eq("request_status", "Pending");

        if (pendingError) throw pendingError;

        // Fetch full supplier details for pending suppliers
        const pendingSupplierDetails = await Promise.all(
          (pending || []).map(async ({ supplier_id }) => {
            const { data: supplier, error: supplierError } = await supabase
              .from("profiles_suppliers")
              .select("*")
              .eq("id", supplier_id)
              .single();

            if (supplierError) throw supplierError;

            return supplier;
          }),
        );

        setPendingSuppliers(pendingSupplierDetails);

        // Fetch current (active) suppliers
        const { data: active, error: activeError } = await supabase
          .from("suppliers_factories")
          .select("supplier_id")
          .eq("factory_id", userId)
          .eq("request_status", "Accepted");

        if (activeError) throw activeError;
        const activeSupplierDetails = await Promise.all(
          (active || []).map(async ({ supplier_id }) => {
            const { data: supplier, error: supplierError } = await supabase
              .from("profiles_suppliers")
              .select("*")
              .eq("id", supplier_id)
              .single();

            if (supplierError) throw supplierError;

            return supplier;
          }),
        );

        setCurrentSuppliers(activeSupplierDetails);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSession().then(() => {
      if (userId) {
        fetchSuppliers();
      }
    });
  }, [userId]);

  // Function to approve a supplier
  const approveSupplier = async (id: string) => {
    try {
      const { error } = await supabase
        .from("suppliers_factories")
        .update({ request_status: "Accepted" })
        .eq("supplier_id", id)
        .eq("factory_id", userId);

      if (error) throw error;

      // Update the lists after approving
      setPendingSuppliers((prev) => prev.filter((s) => s.id !== id));
      const approvedSupplier = pendingSuppliers.find((s) => s.id === id);

      if (approvedSupplier) {
        setCurrentSuppliers((prev) => [
          ...prev,
          { ...approvedSupplier, status: "Accepted" },
        ]);
      }
    } catch (error) {
      console.error("Error approving supplier:", error);
    }
  };

  // Function to reject a supplier
  const rejectSupplier = async (id: string) => {
    try {
      const { error } = await supabase
        .from("suppliers_factories")
        .update({ request_status: "Rejected" })
        .eq("supplier_id", id)
        .eq("factory_id", userId);

      if (error) throw error;

      // Update the lists after approving
      setPendingSuppliers((prev) => prev.filter((s) => s.id !== id));
      const rejectedSupplier = pendingSuppliers.find((s) => s.id === id);

      if (rejectedSupplier) {
        setCurrentSuppliers((prev) => [
          ...prev,
          { ...rejectedSupplier, status: "Rejected" },
        ]);
      }
    } catch (error) {
      console.error("Error rejecting supplier:", error);
    }
  };

  // Filter current suppliers based on search term
  const filteredCurrentSuppliers = currentSuppliers.filter((supplier) => {
    const name = supplier.full_name || ""; // Ensure a default empty string
    const teaNumber = supplier.teaNumber || ""; // Ensure a default empty string

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teaNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const tabs = [
    {
      id: "pending-requests",
      label: "Request Suppliers",
      content: pendingSuppliers.map((supplier, index) => (
        <motion.div
          key={supplier.id}
          animate="visible"
          initial="hidden"
          transition={{ duration: 0.5, delay: index * 0.2 }}
          variants={fadeIn}
        >
          <Card className="mb-4 hover:shadow-xl transition-shadow">
            <CardHeader className="flex items-center">
              <Avatar alt={supplier.full_name} src={supplier.profile_photo} />
              <div className="ml-4">
                <h5>{supplier.full_name}</h5>
                <Badge className="mb-2" color="warning">
                  Pending
                </Badge>
                <p className="text-gray-500">
                  Requested: {supplier.requestDatetime}
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex gap-x-2">
                <Button
                  className="w-full lg:w-1/2 px-4 py-2  text-center"
                  color="success"
                  variant="shadow"
                  onClick={() => approveSupplier(supplier.id)}
                >
                  Approve
                </Button>
                <Button
                  className="w-full lg:w-1/2 px-4 py-2  text-center"
                  color="danger"
                  variant="shadow"
                  onClick={() => rejectSupplier(supplier.id)}
                >
                  Reject
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )),
    },
    {
      id: "current-suppliers",
      label: "Current Suppliers",
      content: (
        <div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Input
              fullWidth
              isClearable
              className="mb-4"
              label="Search by Name or Tea Number"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
          {filteredCurrentSuppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
              animate="visible"
              initial="hidden"
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={fadeIn}
            >
              <Card className="mb-4 hover:shadow-xl transition-shadow">
                <CardHeader className="flex items-center">
                  <Avatar
                    alt={supplier.full_name}
                    src={supplier.profile_photo}
                  />
                  <div className="ml-4">
                    <h5>{supplier.full_name}</h5>
                    <p className="text-gray-500">
                      Tea Number: {supplier.teaNumber}
                    </p>
                    <Badge color="success">Active</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <Button
                    className="w-full lg:w-1/2 px-4 py-2  text-center"
                    color="success"
                    variant="shadow"
                  >
                    View Details
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col p-6 shadow-md rounded-lg ">
      <div className="mb-6">
        <h1 className="text-center text-2xl md:text-4xl dark:text-gray-100 text-gray-900 font-bold">
          All Suppliers
        </h1>
      </div>
      <Tabs
        aria-label="Supplier tabs"
        color="primary"
        items={tabs}
        size="lg"
        variant="underlined"
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item.content}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
