/* eslint-disable no-console */
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Select from "react-select";

import { Carousel, Card } from "@/components/ui/tea_factory-cards-carousel";
import { createClient } from "@/lib/utils/supabase/client";

export default function TeaFactories() {
  const [selectedTowns, setSelectedTowns] = useState<string[]>([]);
  const [userFactories, setUserFactories] = useState<
    { src: string; title: string; category: string; content: string }[]
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

  // Generate cards for factories in selected towns
  const townCards = factories.map((factory) => (
    <div
      key={factory.id}
      className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
    >
      <div className="relative w-32 h-32 mx-auto mb-4">
        <Image
          alt="Factory Photo"
          className="rounded-full shadow-md"
          layout="fill"
          objectFit="cover"
          src={factory.profile_photo || "/default-avatar.jpg"}
        />
      </div>
      <h3 className="text-xl font-bold text-center">{factory.factory_name}</h3>
      <p className="text-center text-gray-600">{factory.address}</p>
      <p className="text-center text-gray-500">{factory.telephone}</p>
      <p className="text-center text-sm text-gray-400">{factory.description}</p>
    </div>
  ));

  // Generate cards for user-specific factories
  const userCards = userFactories.map((card, index) => (
    <Card
      key={card.src}
      card={{
        ...card,
        title: card.title,
        category: card.category,
        content: card.content,
      }}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full py-20 text-white">
      <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold mb-8 text-center">
        {" "}
        Select Your Tea Factory🫡
      </h2>

      <div className="max-w-2xl mx-auto mb-8">
        <h3 className="text-lg font-bold mb-2">Select Town(s):</h3>
        <Select
          isMulti
          className="text-black"
          options={townOptions}
          placeholder="Select one or more towns"
          onChange={handleTownChange}
        />
      </div>

      {selectedTowns.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-4">
            Tea Factories in Selected Towns:
          </h3>
          {factories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {townCards}
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
            Randomly Selected Tea Factories:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {townCards}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No factories available at the moment.
        </p>
      )}
    </div>
  );
}
