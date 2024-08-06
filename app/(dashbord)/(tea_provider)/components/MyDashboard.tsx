/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem, Button, DatePicker, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { CalendarDate, DateValue, getLocalTimeZone, parseDate, today } from "@internationalized/date";

import ApplyTeaPowder from "./ApplyTeaPowder"
import ApplyAdvance from "./ApplyAdvance"
import BarChart from "./BarChart";

const MyDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<DateValue>(today(getLocalTimeZone()));

  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
  const handleDateChange = (date: DateValue) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  const formatDate = (date: CalendarDate) => {
    return new Intl.DateTimeFormat('en-GB').format(date.toDate(getLocalTimeZone()));
  };

  // Sample data for autocomplete and barchart
  const factoryData = [
    { value: 'factory1', label: 'Tea Factory 1' },
    { value: 'factory2', label: 'Tea Factory 2' }
  ];

  // Sample data for bar chart
  const barChartData = [
    { label: 'January', quantity: 730 },
    { label: 'February', quantity: 745 },
    { label: 'March', quantity: 720 },
    { label: 'April', quantity: 830 },
    { label: 'May', quantity: 645 },
    { label: 'June', quantity: 720 },
    { label: 'July', quantity: 730 },
    { label: 'August', quantity: 745 },
    { label: 'September', quantity: 820 }
  ];

  return (
    <div className="w-full h-full  p-8">
      <div className="container mx-auto shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Current Tea Leaves Quantity for This Month
          </h2>
          <h2 className="text-xl font-bold text-green-600">100 KG</h2>
        </div>

        <div className="mb-8">
          <Accordion isCompact>
            <AccordionItem
              key="1"
              aria-label="View analysis of your tea data"
              title="View Analysis of Your Tea Data"
            >
              <div className="w-full">
                <Accordion className="w-full" variant="splitted">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="Production Analysis"
                  >
                    <BarChart data={barChartData}/>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Accordion 2"
                    title="Sales Analysis"
                  >
                    {defaultContent}
                  </AccordionItem>
                </Accordion>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">View Your Chosen Tea Factory</h2>
          <Autocomplete
            className="max-w-xs"
            defaultItems={factoryData}
            label="Your Tea Factories"
            placeholder="Select a Factory"
            onSelectionChange={(item) => console.log(`Selected: ${item}`)}
          >
            {factoryData.map((item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg text-gray-700">
            Last Date You Provided Tea:
          </h2>
          <h2 className="text-lg font-semibold text-gray-800">
            {formatDate(parseDate("2024-08-12"))}
          </h2>
        </div>

        <div className="flex flex-col gap-y-4 ">
          <h2 className="text-lg font-semibold text-gray-800">
            Next Date You Plan to Provide Tea
          </h2>
          <div className="md:flex gap-x-9 flex flex-col md:flex-row gap-y-5">
            <div className="md:w-[320px] flex flex-col gap-1">
              <DatePicker
                defaultValue={today(getLocalTimeZone())}
                label="Select Date"
                minValue={today(getLocalTimeZone())}
                onChange={handleDateChange}
              />
            </div>
            <div className="">
              <Button className="rounded-3xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 py-3 px-7 mt-2" variant="bordered">
                Confirm
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-evenly gap-y-6 mt-16">
          <ApplyTeaPowder/>
          <ApplyAdvance/>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;

