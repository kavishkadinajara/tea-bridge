/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
"use client";

import React, { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Carousel, Card } from "@/components/ui/tea_factory-cards-carousel";
import { createClient } from "@/lib/utils/supabase/client";

export default function TeaFactories() {
  useTheme();
  const [selectedTowns, setSelectedTowns] = useState<string[]>([]);
  const [userFactories, setUserFactories] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [townOptions, setTownOptions] = useState<{ value: string; label: string }[]>([]);
  const [factories, setFactories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    const initializeData = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUserId(data.user.id);
        await fetchUserTown(data.user.id);
      } else {
        console.log("No user found");
        await fetchRandomFactories();
      }
      setLoading(false);
    };

    initializeData();

    fetch("/api/v2/town")
      .then((res) => res.json())
      .then((data) => {
        setTownOptions(
          data.towns.map((town: string) => ({
            value: town,
            label: town,
          }))
        );
      })
      .catch((error) => console.error("Error fetching towns:", error));
  }, []);

  useEffect(() => {
    if (selectedTowns.length > 0) {
      const fetchFactoriesByTown = async () => {
        const supabase = createClient();
        const { data: factories } = await supabase
          .from("profiles_factories")
          .select("*")
          .in("town", selectedTowns);

        setFactories(filterFactories(factories || []));
      };

      fetchFactoriesByTown();
    } else {
      fetchRandomFactories();
    }
  }, [selectedTowns]);

  const fetchUserTown = async (userId: string) => {
    const supabase = createClient();

    const { data: supplierData } = await supabase
      .from("profiles_suppliers")
      .select("town")
      .eq("id", userId)
      .single();

    if (supplierData) {
      await fetchUserFactories(supplierData.town || "");
    } else {
      const { data: factoryData } = await supabase
        .from("profiles_factories")
        .select("town")
        .eq("id", userId)
        .single();

      if (factoryData) {
        await fetchUserFactories(factoryData.town || "");
      }
    }
  };

  const fetchUserFactories = async (userTown: string) => {
    const supabase = createClient();
    const { data: factories } = await supabase
      .from("profiles_factories")
      .select("*")
      .eq("town", userTown);

    setUserFactories(filterFactories(factories || []));
  };

  const fetchRandomFactories = async () => {
    const supabase = createClient();
    const { data: factories } = await supabase
      .from("profiles_factories")
      .select("*");

    const shuffledFactories = (factories || [])
      .filter((factory) => factory.factory_name && factory.tea_leaf_price)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    setFactories(shuffledFactories);
  };

  const filterFactories = (factories: any[]) =>
    factories.filter(
      (factory) => factory.factory_name && factory.tea_leaf_price !== null
    );

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();

      try {
        const { data: sessionData } = await supabase.auth.getUser();
        const response = await fetch("/api/v2/factory-data");
        const data = await response.json();

        if (response.ok) {
          const fetchedProfileData = {
            factoryName: data.profileData.factory_name || "",
            mobileNum: data.profileData.telephone || "",
            address: data.profileData.address || "",
            town: data.profileData.town || "",
            email: sessionData?.user?.email || "",
            description: data.profileData.description || "",
            profilePhoto: data.profileData.profile_photo || "",
            services:
              data.profileData.factory_services?.map(
                (service: { service: string }) => service.service
              ) || [],
          };

          console.log(fetchedProfileData);
          setProfileData(fetchedProfileData);
          setImagePreview(fetchedProfileData.profilePhoto || "");
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleTownChange = (keys: any) => {
    if (Array.isArray(keys)) {
      setSelectedTowns(keys);
    } else {
      setSelectedTowns(Array.from(keys as Set<string>));
    }
  };

  const renderFactories = (factoriesToRender: any[]) =>
    factoriesToRender.map((card, index) => (
      <Card
        key={card.id}
        card={{
          ...card,
          id: card.id,
          factory_name: card.factory_name,
          town: card.town,
          tea_leaf_price: card.tea_leaf_price,
          content: card.content,
          src: card.profile_photo || "/default-factory.png",
          services: card.services,
        }}
        index={index}
      />
    ));

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="relative">
          <Image
            alt="Loading logo"
            className="animate-pulse delay-500"
            height={150}
            src="/logo.png"
            width={150}
          />
          <div className="absolute inset-0 animate-pulse delay-500 bg-gradient-to-r from-green-400 to-green-600 blur-xl opacity-50 rounded-full" />
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-200">
          Loading, please wait...
        </p>
        <div className="flex mt-4 space-x-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce" />
          <span className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-150" />
          <span className="w-3 h-3 bg-green-700 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-20 dark:text-white text-[#071a07]">
      <h2 className="max-w-7xl pl-4 mx-auto text-4xl md:text-6xl font-extrabold mb-10 text-center">
        Select Your Tea Factory 🫡
      </h2>

      <div className="flex flex-col items-center w-full">
        <label
          className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2"
          htmlFor="town-select"
        >
          Select Town(s):
        </label>
        <div className="relative w-full max-w-lg">
          <Select
            className="rounded-lg shadow-md border text-center border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-green-500"
            id="town-select"
            placeholder="Choose one or more towns"
            selectedKeys={new Set(selectedTowns)}
            selectionMode="multiple"
            onSelectionChange={handleTownChange}
          >
            {townOptions.map((town) => (
              <SelectItem
                key={town.value}
                className="p-2 hover:bg-green-100 dark:hover:bg-green-700 text-gray-800 dark:text-gray-100"
              >
                {town.label}
              </SelectItem>
            ))}
          </Select>
          <div className="absolute right-2 top-2 pointer-events-none text-gray-400 dark:text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {selectedTowns.length > 0 && factories.length > 0 && (
        <div className="max-w-7xl mx-auto mt-12">
          <h3 className="text-xl font-bold text-center mb-4">
            Tea Factories in Selected Towns:
          </h3>
          <div className="mt-12 max-w-7xl mx-auto">
            <Carousel items={renderFactories(factories)} />
          </div>
        </div>
      )}

      {userId && userFactories.length > 0 && selectedTowns.length === 0 && (
        <div className="mt-12 max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-4">
            Tea Factories in Your Area:
          </h3>
          <Carousel items={renderFactories(userFactories)} />
        </div>
      )}

      {factories.length > 0 && selectedTowns.length === 0 && (
        <div className="mt-12 max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-4">
            Tea Factories (Randomly Selected):
          </h3>
          <Carousel items={renderFactories(factories)} />
        </div>
      )}
    </div>
  );
}
