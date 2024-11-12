/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import React, { useEffect, useState } from "react";

import { createClient } from "@/lib/utils/supabase/client"; // Adjust this path according to your project structure

interface ProfileProps {
  userId: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const [towns, setTowns] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({
    fullName: "",
    mobileNum: "",
    address: "",
    town: "",
    email: "",
  });
  const [profileData, setProfileData] = useState({
    fullName: "",
    mobileNum: "",
    address: "",
    town: "",
    email: "",
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles_suppliers")
          .select("full_name, telephone, address, town, updated_at")
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
          email: user?.email || "", // Access the email from the user object
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof typeof profileData,
  ) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    });
  };

  const toggleEdit = async () => {
    if (isEditing) {
      console.log("Saving data:", profileData);
      const { error } = await supabase
        .from("profiles_suppliers")
        .update({
          full_name: profileData.fullName,
          telephone: profileData.mobileNum,
          address: profileData.address,
          town: profileData.town,
          updated_at: new Date().toISOString(), // Set the updated time
        })
        .eq("id", userId);

      if (error) {
        console.error("Error updating profile:", error.message);
      } else {
        // Update original profile data with the saved data
        setOriginalProfileData(profileData);
      }
    }

    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    // Reset the profileData to the originalProfileData
    setProfileData(originalProfileData);
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full lg:p-8">
      <div className="container mx-auto bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          My Profile
        </h2>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              className={`w-full p-3 rounded-xl border ${
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

          {/* <div>
            <Map userId={userId} />
          </div> */}
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
