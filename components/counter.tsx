"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex justify-center content-center items-center">
      <Button radius="full" onPress={() => setCount(count + 1)}>
      Count is {count}
    </Button>
    </div>
  );
};
