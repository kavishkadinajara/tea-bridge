/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/utils/supabase/client"; // Adjust path if needed

export default function ProfilePage() {
  const [towns, setTowns] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({
    factoryName: "",
    mobileNum: "",
    address: "",
    town: "",
    email: "",
    description: "",
    profilePhoto: "",
  });
  const [profileData, setProfileData] = useState({
    factoryName: "",
    mobileNum: "",
    address: "",
    town: "",
    email: "",
    description: "",
    profilePhoto: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const supabase = createClient();

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getUser();

        if (sessionData.user) {
          setUserId(sessionData.user.id);

          // Fetch profile data with joined services
          const { data: joinedData, error } = await supabase
            .from("profiles_factories")
            .select(
              `factory_name, telephone, address, town, description, profile_photo, 
              factory_services(service)`,
            )
            .eq("id", sessionData.user.id)
            .single();

          if (error) throw error;

          const fetchedProfileData = {
            factoryName: joinedData?.factory_name || "",
            mobileNum: joinedData?.telephone || "",
            address: joinedData?.address || "",
            town: joinedData?.town || "",
            email: sessionData.user.email || "",
            description: joinedData?.description || "",
            profilePhoto: joinedData?.profile_photo || "",
          };

          setProfileData(fetchedProfileData);
          setOriginalProfileData(fetchedProfileData);
          setImagePreview(fetchedProfileData.profilePhoto || "");

          // Extract services from joined data
          const fetchedServices =
            joinedData?.factory_services?.map(
              (service: { service: string }) => service.service,
            ) || [];

          setServices(fetchedServices);
        }
      } catch (error) {
        console.error("Error fetching profile or services:", error);
      }
    };

    fetchSessionAndProfile();

    fetch("/api/v2/town")
      .then((res) => res.json())
      .then((data) => setTowns(data.towns || []))
      .catch((error) => console.error("Error fetching towns:", error));
  }, [supabase]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: keyof typeof profileData,
  ) => setProfileData({ ...profileData, [field]: e.target.value });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadImage = async () => {
    if (file) {
      const { data, error } = await supabase.storage
        .from("factory-images")
        .upload(`${userId}/${file.name}`, file);

      if (error) {
        console.error("Error uploading image:", error.message);

        return null;
      }

      return data?.path || null;
    }

    return null;
  };

  const saveProfile = async () => {
    const imgPath = await uploadImage();
    const updatedProfilePhoto = imgPath
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/factory-images/${imgPath}`
      : profileData.profilePhoto;

    const { error } = await supabase
      .from("profiles_factories")
      .update({
        factory_name: profileData.factoryName,
        telephone: profileData.mobileNum,
        address: profileData.address,
        town: profileData.town,
        description: profileData.description,
        profile_photo: updatedProfilePhoto,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error.message);
    } else {
      setOriginalProfileData(profileData);
      setIsEditing(false);
    }
  };

  const toggleEdit = () => {
    if (isEditing) saveProfile();
    else setIsEditing(true);
  };

  const handleCancel = () => {
    setProfileData(originalProfileData);
    setImagePreview(originalProfileData.profilePhoto);
    setIsEditing(false);
  };

  const handleAddService = async () => {
    if (newService.trim()) {
      try {
        const { error } = await supabase
          .from("factory_services")
          .insert({ factory_id: userId, service: newService });

        if (error) throw error;

        setServices([...services, newService]);
        setNewService("");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error adding service:", error.message);
        } else {
          console.error("Error adding service:", error);
        }
      }
    }
  };

  const handleRemoveService = async (index: number) => {
    const serviceToRemove = services[index];

    try {
      const { error } = await supabase
        .from("factory_services")
        .delete()
        .eq("factory_id", userId)
        .eq("service", serviceToRemove);

      if (error) throw error;

      setServices(services.filter((_, i) => i !== index));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error removing service:", error.message);
      } else {
        console.error("Error removing service:", error);
      }
    }
  };

  return (
    <div className="w-full h-full lg:p-8">
      <div className="container mx-auto  rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          {profileData.factoryName} Profile
        </h2>

        {/* Profile Picture */}
        <div className="relative w-32 h-32 mx-auto">
          <Image
            alt="Profile Photo"
            className="rounded-full shadow-md"
            layout="fill"
            objectFit="cover"
            src={imagePreview || "/default-avatar.jpg"}
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full cursor-pointer">
              <span className="text-white text-lg">📷</span>
              <input
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-12">
          {/* Factory Name */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Factory Name
            </label>
            <input
              className={`w-full p-3 rounded-lg border ${
                isEditing
                  ? "border-lime-500 bg-white"
                  : "border-gray-300 bg-gray-100"
              } text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`}
              disabled={!isEditing}
              type="text"
              value={profileData.factoryName}
              onChange={(e) => handleInputChange(e, "factoryName")}
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Mobile Number
            </label>
            <input
              className={`w-full p-3 rounded-lg border ${
                isEditing
                  ? "border-lime-500 bg-white"
                  : "border-gray-300 bg-gray-100"
              } text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`}
              disabled={!isEditing}
              type="text"
              value={profileData.mobileNum}
              onChange={(e) => handleInputChange(e, "mobileNum")}
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">Address</label>
            <input
              className={`w-full p-3 rounded-lg border ${
                isEditing
                  ? "border-lime-500 bg-white"
                  : "border-gray-300 bg-gray-100"
              } text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`}
              disabled={!isEditing}
              type="text"
              value={profileData.address}
              onChange={(e) => handleInputChange(e, "address")}
            />
          </div>

          {/* Town Selection */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">Town</label>
            {isEditing ? (
              <select
                className="w-full p-3 rounded-lg border border-lime-500 bg-white text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                value={profileData.town}
                onChange={(e) => handleInputChange(e, "town")}
              >
                {towns.length > 0 ? (
                  towns.map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))
                ) : (
                  <option>Loading towns...</option>
                )}
              </select>
            ) : (
              <input
                disabled
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                value={profileData.town}
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">Email</label>
            <input
              disabled
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              type="email"
              value={profileData.email}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              className={`w-full p-3 rounded-lg border ${
                isEditing
                  ? "border-lime-500 bg-white"
                  : "border-gray-300 bg-gray-100"
              } text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`}
              disabled={!isEditing}
              maxLength={1000} // Ensures input is restricted at the browser level
              value={profileData.description}
              onChange={(e) => {
                const value = e.target.value;

                if (value.length <= 1000) {
                  handleInputChange(e, "description");
                }
              }}
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {profileData.description.length}/1000 characters
            </div>
            {profileData.description.length > 1000 && (
              <div className="text-sm text-red-500 dark:text-red-400 mt-1">
                ⚠️ Description cannot exceed 1000 characters.
              </div>
            )}
          </div>

          {/* Services Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Factory Services
            </h3>

            {isEditing ? (
              <div>
                {/* List Existing Services */}
                {services.map((service, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                      type="text"
                      value={service}
                    />
                    <button
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveService(index)}
                    >
                      ✖
                    </button>
                  </div>
                ))}

                {/* Add New Service */}
                <div className="flex items-center">
                  <input
                    className="w-full p-2 border rounded-md text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    placeholder="Add a new service"
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                  />
                  <button
                    className="ml-2 bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600"
                    onClick={handleAddService}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <ul className="list-disc pl-5">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-800 dark:text-gray-200">
                    {service}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {isEditing ? (
            <>
              <button
                className="w-full lg:w-1/2 px-4 py-2 border-cyan-600 hover:border-lime-500 border-2 shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10 text-center"
                onClick={toggleEdit}
              >
                Save
              </button>
              <button
                className="w-full lg:w-1/2 px-4 py-2 border-red-600 hover:border-rose-500 border-2 shadow-md shadow-red-600 hover:shadow-rose-600 transition-shadow duration-300 hover:shadow-lg text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-10 text-center"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="w-full lg:w-1/2 px-4 py-2 border-cyan-600 hover:border-lime-500 border-2 shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10 text-center"
              onClick={toggleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
