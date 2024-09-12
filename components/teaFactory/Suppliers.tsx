import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Avatar, Button, Badge, Input } from "@nextui-org/react";
import { motion } from "framer-motion"; // For animations

interface SuppliersProps {
  userId: string;
}

interface Supplier {
  name: string;
  status: string;
  avatar: string;
  teaNumber?: string;
  requestDatetime?: string;
}

const Suppliers: React.FC<SuppliersProps> = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const pendingSuppliers: Supplier[] = [
    { name: "John Doe", status: "Pending", avatar: "https://i.pravatar.cc/150?u=john", requestDatetime: "2024-09-10 14:23" },
    { name: "Jane Smith", status: "Pending", avatar: "https://i.pravatar.cc/150?u=jane", requestDatetime: "2024-09-09 09:12" },
  ];

  const currentSuppliers: Supplier[] = [
    { name: "Alice Cooper", status: "Active", avatar: "https://i.pravatar.cc/150?u=alice", teaNumber: "T123" },
    { name: "Bob Johnson", status: "Active", avatar: "https://i.pravatar.cc/150?u=bob", teaNumber: "T456" },
  ];

  const filteredCurrentSuppliers = currentSuppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.teaNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          key={supplier.name}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: index * 0.2 }}
          variants={fadeIn}
        >
          <Card className="mb-4 hover:shadow-xl transition-shadow">
            <CardHeader className="flex items-center">
              <Avatar src={supplier.avatar} alt={supplier.name} />
              <div className="ml-4">
                <h5>{supplier.name}</h5>
                <Badge color="warning" className="mb-2">
                  {supplier.status}
                </Badge>
                <p className="text-gray-500">Requested: {supplier.requestDatetime}</p>
              </div>
            </CardHeader>
            <CardBody>
              <Button
                color="primary"
                variant="shadow"
                className="hover:scale-105 transition-transform duration-300"
              >
                Approve
              </Button>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Input
              fullWidth
              isClearable
            //   bordered
              label="Search by Name or Tea Number"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
          </motion.div>
          {filteredCurrentSuppliers.map((supplier, index) => (
            <motion.div
              key={supplier.name}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={fadeIn}
            >
              <Card className="mb-4 hover:shadow-xl transition-shadow">
                <CardHeader className="flex items-center">
                  <Avatar src={supplier.avatar} alt={supplier.name} />
                  <div className="ml-4">
                    <h5>{supplier.name}</h5>
                    <p className="text-gray-500">Tea Number: {supplier.teaNumber}</p>
                    <Badge color="success">{supplier.status}</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <Button
                    color="primary"
                    variant="shadow"
                    className="hover:scale-105 transition-transform duration-300"
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
        <div>
            <h1 className="text-center text-xl md:text-3xl dark:text-gray-100 text-gray-900 font-bold">All Suppliers</h1>
        </div>
      <Tabs aria-label="Supplier tabs" items={tabs} variant="underlined" color="primary" size="lg">
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <div className="py-4">{item.content}</div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default Suppliers;
