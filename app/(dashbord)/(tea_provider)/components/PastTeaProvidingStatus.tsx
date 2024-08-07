/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { teadata } from "./data";

interface PastTeaProvidingStatusProps {
    selectedFactory: string | null;
}

type TeaData = {
  date: string;
  total_kilo: string;
  decresing: string;
  final_total: string;
};

type GroupedData = {
  [year: string]: {
    [month: string]: TeaData[];
  };
};

const groupDataByMonthYear = (data: TeaData[]): GroupedData => {
  return data.reduce((acc, item) => {
    const [day, month, year] = item.date.split(".");

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    acc[year][month].push(item);

    return acc;
  }, {} as GroupedData);
};

const PastTeaProvidingStatus: React.FC<PastTeaProvidingStatusProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedFactory,
}) => {
  const [page, setPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    undefined,
  );
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    undefined,
  );
  const rowsPerPage = 10;

  const groupedData = useMemo(() => groupDataByMonthYear(teadata), []);
  const years = Object.keys(groupedData);
  const months = selectedYear ? Object.keys(groupedData[selectedYear]) : [];

  const filteredData = useMemo(() => {
    if (selectedYear && selectedMonth) {
      return groupedData[selectedYear][selectedMonth] || [];
    }

    return [];
  }, [selectedYear, selectedMonth, groupedData]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

  return (
    <div className="container mx-auto w-full">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Past Tea Providing Status
        </h1>
        <p className="text-gray-600">
          View historical data on tea provisions by month and year.
        </p>
      </header>
      <div className="controls mb-6 flex justify-center space-x-4">
        <Select
          className="w-40"
          placeholder="Select Year"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </Select>
        <Select
          className="w-40"
          disabled={!selectedYear}
          placeholder="Select Month"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Table
        aria-label="Example table with client side pagination"
        className="shadow-md rounded-lg overflow-hidden w-full"
      >
        <TableHeader>
          <TableColumn key="date">DATE</TableColumn>
          <TableColumn key="total_kilo">TOTAL KG</TableColumn>
          <TableColumn key="decresing">DECREASING</TableColumn>
          <TableColumn key="final_total">FINAL KG</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: TeaData) => (
            <TableRow key={item.date} className="">
              {(columnKey) => (
                <TableCell className="p-4 border-b border-gray-900 dark:border-green-50">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default PastTeaProvidingStatus;
