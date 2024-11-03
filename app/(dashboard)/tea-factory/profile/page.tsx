/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/utils/supabase/client"; // Adjust path

interface ProfileProps {
  userId: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
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

  const [file, setFile] = useState<File | null>(null); // To handle image file
  const [imagePreview, setImagePreview] = useState<string>("");

  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles_factories")
          .select(
            "factory_name, telephone, address, town, description, profile_photo",
          )
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
          factoryName: profileData?.factory_name || "",
          mobileNum: profileData?.telephone || "",
          address: profileData?.address || "",
          town: profileData?.town || "",
          email: user?.email || "",
          description: profileData?.description || "",
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
    // Upload image and get the URL
    const imgPath = await uploadImage();

    // Update profile photo in profile data
    const updatedProfilePhoto = imgPath
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/factory-images/${imgPath}`
      : profileData.profilePhoto;

    // Update the profile data in the database
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
      <div className="container mx-auto  rounded-xl p-8">
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
              className={`w-full p-3 rounded-xl border ${
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
              className={`w-full p-3 rounded-xl border ${
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
              className={`w-full p-3 rounded-xl border ${
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
                className="w-full p-3 rounded-xl border border-lime-500 bg-white text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
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
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                value={profileData.town}
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">Email</label>
            <input
              disabled
              className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
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
              className={`w-full p-3 rounded-xl border ${
                isEditing
                  ? "border-lime-500 bg-white"
                  : "border-gray-300 bg-gray-100"
              } text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`}
              disabled={!isEditing}
              value={profileData.description}
              onChange={(e) => handleInputChange(e, "description")}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {isEditing ? (
            <>
              <button
                className="p-3 rounded-xl bg-lime-500 hover:bg-lime-600 text-white font-bold"
                onClick={toggleEdit}
              >
                Save
              </button>
              <button
                className="p-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="p-3 rounded-xl bg-lime-500 hover:bg-lime-600 text-white font-bold"
              onClick={toggleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
