/* eslint-disable no-console */
"use client";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { FaLeaf, FaCalendarAlt } from "react-icons/fa";
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";

import ApplyTeaPowder from "@/components/teaProvider/ApplyTeaPowder";
import ApplyAdvance from "@/components/teaProvider/ApplyAdvance";
import ApplyFertilizer from "@/components/teaProvider/ApplyFertilizer";
import PastTeaProvidingStatus from "@/components/teaProvider/PastTeaProvidingStatus";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<DateValue>(
    today(getLocalTimeZone()),
  );
  const [selectedFactory, setSelectedFactory] = useState<string | null>(null);

  const handleDateChange = (date: DateValue) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  const formatDate = (date: CalendarDate) => {
    return new Intl.DateTimeFormat("en-GB").format(
      date.toDate(getLocalTimeZone()),
    );
  };

  const factoryData = [
    { value: "factory1", label: "Tea Factory 1" },
    { value: "factory2", label: "Tea Factory 2" },
  ];

  const handleFactoryView = () => {
    console.log("View Tea Factories button clicked");
    // Add functionality for opening modal or redirecting to factory view
  };

  return (
    <div className="w-full h-full lg:p-8">
      <div className="container mx-auto bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Dashboard
        </h2>

        {/* Current Total Quantity & Last Date Provided */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg">
            <FaLeaf className="text-green-700 dark:text-green-400 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Current Total Quantity
              </h3>
              <p className="text-4xl font-bold text-green-700 dark:text-green-400 my-2">
                100 KG
              </p>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                for This Month
              </span>
            </div>
          </div>

          <div className="flex items-center p-6 border border-cyan-600 hover:border-lime-500 rounded-xl shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg">
            <FaCalendarAlt className="text-blue-700 dark:text-blue-400 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Last Date
              </h3>
              <p className="text-4xl font-bold text-blue-700 dark:text-blue-400 my-2">
                {formatDate(parseDate("2024-08-12"))}
              </p>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                you provided tea
              </span>
            </div>
          </div>
        </div>

        <header className="mb-6 text-center mt-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Choose perfect tea factories and request to provide tea leaves
          </h1>
          <p className="text-gray-600">View your chosen tea factories</p>
        </header>

        {/* Choose perfect tea factories and your current chosen tea factories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Button
            className="rounded-3xl text-xl font-medium md:text-2xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 px-7 md:px-12 py-20 flex flex-col items-center gap-1"
            variant="bordered"
            onPress={handleFactoryView}
          >
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Click here to
            </span>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faIndustry} />
              <span>View Tea Factories in your area</span>
            </div>
          </Button>
        </div>

        {/* Factory Selection */}
        <div className="my-12">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Select Your Tea Factory
          </h3>
          <Autocomplete
            className="md:max-w-xs w-full"
            defaultItems={factoryData}
            label="Your Tea Factories"
            placeholder="Select a Factory"
            onSelectionChange={(item) => {
              if (item) {
                setSelectedFactory(item.toString());
                console.log(`Selected: ${item}`);
              }
            }}
          >
            {factoryData.map((item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        {selectedFactory && (
          <>
            {/* Next Date Picker */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Next Date You Plan to Provide Tea
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <DatePicker
                  className="w-full md:w-auto"
                  defaultValue={today(getLocalTimeZone())}
                  label="Select Date"
                  minValue={today(getLocalTimeZone())}
                  onChange={handleDateChange}
                />
                <Button
                  className="rounded-xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 py-3 px-7 transition-all duration-200"
                  variant="bordered"
                >
                  Confirm
                </Button>
              </div>
            </div>

            {/* Application Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 mb-10">
              <ApplyTeaPowder selectedFactory={selectedFactory} />
              <ApplyAdvance selectedFactory={selectedFactory} />
              <ApplyFertilizer selectedFactory={selectedFactory} />
            </div>

            {/* Past Tea Providing Status */}
            <div className="flex flex-col mb-8">
              <PastTeaProvidingStatus selectedFactory={selectedFactory} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
