import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Avatar, Button, Badge } from "@nextui-org/react";

interface SuppliersProps {
  userId: string;
}

const Suppliers: React.FC<SuppliersProps> = ({ userId }) => {

  // Temporary supplier data for the tabs
  const pendingSuppliers = [
    { name: "John Doe", status: "Pending", avatar: "https://i.pravatar.cc/150?u=john" },
    { name: "Jane Smith", status: "Pending", avatar: "https://i.pravatar.cc/150?u=jane" },
  ];

  const currentSuppliers = [
    { name: "Alice Cooper", status: "Active", avatar: "https://i.pravatar.cc/150?u=alice" },
    { name: "Bob Johnson", status: "Active", avatar: "https://i.pravatar.cc/150?u=bob" },
  ];

  const tabs = [
    {
      id: "pending-requests",
      label: "Requests Suppliers",
      content: pendingSuppliers.map((supplier) => (
        <Card key={supplier.name} className="mb-4">
          <CardHeader className="flex items-center">
            <Avatar src={supplier.avatar} alt={supplier.name} />
            <div className="ml-4">
              <h5>{supplier.name}</h5>
              <Badge color="warning">{supplier.status}</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <Button color="primary" variant="shadow">Approve</Button>
          </CardBody>
        </Card>
      )),
    },
    {
      id: "current-suppliers",
      label: "Current Suppliers",
      content: currentSuppliers.map((supplier) => (
        <Card key={supplier.name} className="mb-4">
          <CardHeader className="flex items-center">
            <Avatar src={supplier.avatar} alt={supplier.name} />
            <div className="ml-4">
              <h5>{supplier.name}</h5>
              <Badge color="success">{supplier.status}</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <Button color="danger" variant="shadow">Remove</Button>
          </CardBody>
        </Card>
      )),
    }
  ];

  return (
    <div className="flex w-full flex-col p-6  shadow-md rounded-lg">
      <Tabs aria-label="Supplier tabs" items={tabs} variant="underlined" color="primary" size="lg">
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <div className="py-4">
              {item.content}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default Suppliers;
