/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import {DateValue, getLocalTimeZone, parseDate, today} from "@internationalized/date";
import {DatePicker} from "@nextui-org/react";

import { data } from "./data";

const MyDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState<DateValue>(
    today(getLocalTimeZone())
  );

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  // Function to handle date selection
  const handleDateChange = (date: DateValue) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div className="w-full h-full  p-8">
      <div className="container mx-auto p-6 shadow-md rounded-lg">
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
                    {defaultContent}
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
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            View Your Chosen Tea Factory
          </h2>
          <Autocomplete
            className="max-w-xs"
            defaultItems={data}
            label="Your Tea Factories"
            placeholder="Select a Factory"
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg text-gray-700">
            Last Date You Provided Tea:
          </h2>
          <h2 className="text-lg font-semibold text-gray-800">
            2024 Aug 12
          </h2>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Next Date You Plan to Provide Tea
          </h2>
          <div className="md:flex md:justify-between">
            <div className="w-[320px] flex flex-col gap-1">
              <DatePicker
                defaultValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                label="Date and time"
                minValue={today(getLocalTimeZone())}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
