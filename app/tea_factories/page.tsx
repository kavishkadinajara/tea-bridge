/* eslint-disable no-console */
"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useTheme } from "next-themes";

import { Carousel, Card } from "@/components/ui/tea_factory-cards-carousel";
import { createClient } from "@/lib/utils/supabase/client";

export default function TeaFactories() {
  const { theme } = useTheme();
  const [selectedTowns, setSelectedTowns] = useState<string[]>([]);
  const [userFactories, setUserFactories] = useState<
    {
      id: string;
      tea_leaf_price: number;
      factory_name: string;
      profile_photo: string;
      town: string;
      content: string;
    }[]
  >([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [townOptions, setTownOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [factories, setFactories] = useState<any[]>([]);

  // Fetch user data and town options on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUserId(data.user.id || "");
        await fetchUserTown(data.user.id);
      } else {
        console.log("No user found");
        await fetchRandomFactories();
      }
    };

    fetchUser();

    // Fetch town options dynamically
    fetch("/api/v2/town")
      .then((res) => res.json())
      .then((data) => {
        setTownOptions(
          data.towns.map((town: string) => ({ value: town, label: town })),
        );
      })
      .catch((error) => console.error("Error fetching towns:", error));
  }, []);

  // Fetch the user's town based on their ID
  const fetchUserTown = async (userId: string) => {
    const supabase = createClient();
    const { data: supplierData, error: supplierError } = await supabase
      .from("profiles_suppliers")
      .select("town")
      .eq("id", userId)
      .single();

    if (supplierError) {
      console.error("Error fetching user town from suppliers:", supplierError);
    } else if (supplierData) {
      const userTown = supplierData.town || "";

      await fetchUserFactories(userTown);

      return userTown;
    }

    const { data: factoryData, error: factoryError } = await supabase
      .from("profiles_factories")
      .select("town")
      .eq("id", userId)
      .single();

    if (factoryError) {
      console.error("Error fetching user town from factories:", factoryError);
    } else if (factoryData) {
      const userTown = factoryData.town || "";

      await fetchUserFactories(userTown);

      return userTown;
    }
  };

  // Fetch factories based on the user's town
  const fetchUserFactories = async (userTown: string) => {
    const supabase = createClient();
    const { data: factories, error } = await supabase
      .from("profiles_factories")
      .select("*")
      .eq("town", userTown);

    if (error) {
      console.error("Error fetching user factories:", error);
    } else {
      setUserFactories(factories || []);
    }
  };

  // Fetch random factories if no user is logged in
  const fetchRandomFactories = async () => {
    const supabase = createClient();
    const { data: factories, error } = await supabase
      .from("profiles_factories")
      .select("*");

    if (error) {
      console.error("Error fetching random factories:", error);
    } else {
      // Shuffle the fetched factories to simulate randomness
      const shuffledFactories = factories
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

      setFactories(shuffledFactories);
    }
  };

  // Fetch factories based on selected towns
  useEffect(() => {
    if (selectedTowns.length > 0) {
      const fetchFactoriesByTown = async () => {
        const supabase = createClient();
        const { data: factories, error } = await supabase
          .from("profiles_factories")
          .select("*")
          .in("town", selectedTowns);

        if (error) {
          console.error("Error fetching factories by town:", error);
        } else {
          setFactories(factories);
        }
      };

      fetchFactoriesByTown();
    }
  }, [selectedTowns]);

  // Handle town selection change
  const handleTownChange = (selectedOptions: any) => {
    setSelectedTowns(selectedOptions.map((option: any) => option.value));
  };

  // Generate cards for user-specific factories
  const userCards = userFactories.map((card, index) => (
    <Card
      key={card.id}
      card={{
        ...card,
        factory_name: card.factory_name,
        town: card.town,
        tea_leaf_price: card.tea_leaf_price,
        content: card.content,
        src: card.profile_photo || "/default-factory.png", // Add src property
      }}
      index={index}
    />
  ));

  return (
    <div
      className={`w-full h-full py-20 ${theme === "dark" ? "text-white " : "text-black "}`}
    >
      <h2 className="max-w-7xl pl-4 mx-auto text-4xl md:text-6xl font-extrabold mb-10 text-center">
        Select Your Tea Factory 🫡
      </h2>

      <div className="max-w-2xl mx-auto mb-10 z-50">
        <h3 className="text-xl font-semibold mb-4">Select Town(s):</h3>
        <Select
          isMulti
          className="text-black z-50"
          options={townOptions}
          placeholder="Select one or more towns"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: theme === "dark" ? "#4A5568" : "#CBD5E0",
              boxShadow: "none",
              "&:hover": {
                borderColor: theme === "dark" ? "#A0AEC0" : "#4A5568",
              },
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          onChange={handleTownChange}
        />
      </div>

      {selectedTowns.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-4">
            Tea Factories in Selected Towns:
          </h3>
          {factories.length > 0 ? (
            <div className="mt-12 max-w-7xl mx-auto">
              <Carousel items={userCards} />
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No factories found for the selected towns.
            </p>
          )}
        </div>
      )}

      {userId && userFactories.length > 0 ? (
        <div className="mt-12 max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-4">
            Tea Factories in Your Area:
          </h3>
          <Carousel items={userCards} />
        </div>
      ) : factories.length > 0 ? (
        <div className="mt-12 max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-4">
            Tea Factories in Your Area:
          </h3>
          <Carousel items={userCards} />
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No factories available at the moment.
        </p>
      )}
    </div>
  );
}
