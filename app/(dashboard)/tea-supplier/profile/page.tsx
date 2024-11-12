/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/utils/supabase/client"; // Adjust path

export default function SupplierProfilePage() {
  const [towns, setTowns] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({
    fullName: "",
    mobileNum: "",
    address: "",
    town: "",
    email: "",
    profilePhoto: "",
  });
  const [profileData, setProfileData] = useState({
    fullName: "",
    mobileNum: "",
    address: "",
    town: "",
    email: "",
    profilePhoto: "",
  });

  const [file, setFile] = useState<File | null>(null); // To handle image file
  const [imagePreview, setImagePreview] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles_suppliers")
          .select("full_name, telephone, address, town, profile_photo")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;

        // Fetch user email from Supabase Auth
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        const fetchedProfileData = {
          fullName: profileData?.full_name || "",
          mobileNum: profileData?.telephone || "",
          address: profileData?.address || "",
          town: profileData?.town || "",
          email: user?.email || "",
          profilePhoto: profileData?.profile_photo || "",
        };

        // Set both profileData and originalProfileData to the fetched data
        setProfileData(fetchedProfileData);
        setOriginalProfileData(fetchedProfileData);
        setImagePreview(fetchedProfileData.profilePhoto || "");
      } catch (error) {
        console.error("Error fetching profile or email:", error);
      }
    };

    const fetchSession = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUserId(data.user.id || "");
      }
    };

    fetchSession();
    fetchProfile();

    // Fetch town options dynamically
    fetch("/api/v2/town")
      .then((res) => res.json())
      .then((data) => {
        setTowns(data.towns || []);
      })
      .catch((error) => console.error("Error fetching towns:", error));
  }, [userId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: keyof typeof profileData,
  ) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    if (file) {
      const { data, error } = await supabase.storage
        .from("avatars")
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
    // Upload image and get the URL
    const imgPath = await uploadImage();

    // Update profile photo in profile data
    const updatedProfilePhoto = imgPath
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/supplier-images/${imgPath}`
      : profileData.profilePhoto;

    // Update the profile data in the database
    const { error } = await supabase
      .from("profiles_suppliers")
      .update({
        full_name: profileData.fullName,
        telephone: profileData.mobileNum,
        address: profileData.address,
        town: profileData.town,
        profile_photo: updatedProfilePhoto,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error.message);
    } else {
      setOriginalProfileData(profileData);
      setIsEditing(false); // Exit editing mode after saving
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      saveProfile();
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setProfileData(originalProfileData);
    setImagePreview(originalProfileData.profilePhoto);
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full lg:p-8">
      <div className="container mx-auto  rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          {profileData.fullName} Profile
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
          {/* Full Name */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              className={`w-full p-3 rounded-lg border ${
                isEditing
                  ? "border-lime-500 bg-white"
                  : "border-gray-300 bg-gray-100"
              } text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`}
              disabled={!isEditing}
              type="text"
              value={profileData.fullName}
              onChange={(e) => handleInputChange(e, "fullName")}
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
