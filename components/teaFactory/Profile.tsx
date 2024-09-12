/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import React, { useEffect, useState } from "react";

import { createClient } from "@/lib/utils/supabase/client"; // Adjust this path according to your project structure
import { ReactElement, JSXElementConstructor, ReactNode, Key } from "react";

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
  });
  const [profileData, setProfileData] = useState({
    factoryName: "",
    mobileNum: "",
    address: "",
    town: "",
    email: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null); // To handle image file
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles_factories")
          .select(
            "factory_name, telephone, address, town, updated_at, description",
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
        };

        // Set both profileData and originalProfileData to the fetched data
        setProfileData(fetchedProfileData);
        setOriginalProfileData(fetchedProfileData);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching profile or email:", error.message);
        } else {
          console.error("Unknown error occurred:", error);
        }
      }
    };

    fetchProfile();

    // Fetch town options dynamically
    fetch("/api/v2/town")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      })
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
      setFile(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length <= 300) {
      setProfileData({
        ...profileData,
        description: e.target.value,
      });
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

    if (imgPath) {
      const { error: imgSaveError } = await supabase
        .from("factory_imgs")
        .insert({
          factory_id: userId,
          img_url: imgPath,
        });

      if (imgSaveError) {
        console.error("Error saving image URL:", imgSaveError.message);
      }
    }

    // Update the profile data in the database
    const { error } = await supabase
      .from("profiles_factories")
      .update({
        factory_name: profileData.factoryName,
        telephone: profileData.mobileNum,
        address: profileData.address,
        town: profileData.town,
        description: profileData.description,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error.message);
    } else {
      setOriginalProfileData(profileData);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      saveProfile();
    }

    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setProfileData(originalProfileData);
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full lg:p-8">
      <div className="container mx-auto bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          {profileData.factoryName} Profile
        </h2>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Full Name */}
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
                  <option value={profileData.town}>{profileData.town}</option>
                )}
              </select>
            ) : (
              <input
                disabled
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                type="text"
                value={profileData.town}
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">Email</label>
            <input
              disabled
              className={`w-full p-3 rounded-xl border ${
                isEditing
                  ? "border-lime-500 bg-white"
                  : "border-gray-300 bg-gray-100"
              } text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`}
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Description (max 300 chars)
            </label>
            <textarea
              className={`w-full p-3 rounded-xl border ${
                isEditing
                  ? "border-lime-500 bg-white"
                  : "border-gray-300 bg-gray-100"
              } text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`}
              disabled={!isEditing}
              maxLength={300}
              value={profileData.description}
              onChange={handleDescriptionChange}
            />
            <p>{profileData.description.length} / 300</p>
          </div>

          {/* Image Upload */}
          {isEditing && (
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Upload Factory Image
              </label>
              <input
                accept="image/*"
                className="block w-full text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        {/* Update and Cancel Buttons */}
        <div className="text-center">
          <button
            className="px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-600 text-white font-bold shadow-lg transition-all mr-4"
            onClick={toggleEdit}
          >
            {isEditing ? "Save" : "Update"}
          </button>
          {isEditing && (
            <button
              className="px-6 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-bold shadow-lg transition-all"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
