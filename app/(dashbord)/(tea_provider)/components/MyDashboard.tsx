/* eslint-disable no-console */
"use client";

import React, { useState } from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";

const MyDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<DateValue>(
    today(getLocalTimeZone()),
  );

  // Function to handle date selection
  const handleDateChange = (date: DateValue) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col container p-6 justify-center items-center">
        <div className="flex gap-x-12 lg:gap-x-16">
          <div>
            <h2>Current Tea Leaves Quantity for This month</h2>
          </div>
          <div>
            <h2>100 KG</h2>
          </div>
        </div>

        <div>
          <h2>Current Tea Leaves Quantity for This year</h2>
          <Calendar
            aria-label="Date (Min Date Value)"
            defaultValue={today(getLocalTimeZone())}
            minValue={today(getLocalTimeZone())}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
