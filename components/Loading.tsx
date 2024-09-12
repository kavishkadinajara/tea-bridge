import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function DashboardLoading() {
  return (
    <div className="w-full h-full lg:p-8">
      <Card className="w-full h-full p-6 space-y-8 bg-transparent shadow-md rounded-xl">
        <Skeleton className="rounded-xl">
          <div className="h-32 rounded-xl" />
        </Skeleton>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-6 md:space-y-0 md:space-x-6">
          <Skeleton className="w-full md:w-1/3 p-6 rounded-xl">
            <div className="h-24 rounded-xl" />
          </Skeleton>
          <Skeleton className="w-full md:w-1/3 p-6 rounded-xl">
            <div className="h-24 rounded-xl" />
          </Skeleton>
        </div>
        <Skeleton className="rounded-xl">
          <div className="h-16 rounded-xl" />
        </Skeleton>
        <Skeleton className="rounded-xl">
          <div className="h-40 rounded-xl" />
        </Skeleton>
        <div className="flex flex-col md:flex-row justify-center md:justify-evenly space-y-6 md:space-y-0">
          <Skeleton className="w-full md:w-1/3 p-6 rounded-xl">
            <div className="h-40 rounded-xl" />
          </Skeleton>
          <Skeleton className="w-full md:w-1/3 p-6 rounded-xl">
            <div className="h-40 rounded-xl" />
          </Skeleton>
          <Skeleton className="w-full md:w-1/3 p-6 rounded-xl">
            <div className="h-40 rounded-xl" />
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}
