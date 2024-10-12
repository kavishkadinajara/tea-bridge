"use client";

import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { Input } from "@nextui-org/input";
import React, { FormEvent, useState } from "react";
import clsx from "clsx";
import { Select, SelectItem } from "@nextui-org/react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/utils/supabase/client"; // Ensure this is the correct path to your supabaseClient.js
import { SelectorIcon } from "@/components/SelectorIcon";
import { userType } from "@/config/data";

export default function SingUp() {
  const [isErrorMsg, setErrorMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isVisibleR, setIsVisibleR] = useState(false);
  const [isVisibleL, setIsVisibleL] = useState(false);

  const toggleVisibilityR = () => setIsVisibleR(!isVisibleR);
  const toggleVisibilityL = () => setIsVisibleL(!isVisibleL);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const [authCard, setAuthCard] = useState("Sign In");

  function toggleTwoAuth() {
    setAuthCard((prevAuthCard) =>
      prevAuthCard === "Sign In" ? "Sign Up" : "Sign In",
    );
    setError("");
    setErrorMsg("");
    setLoginPassword("");
    setLoginEmail("");
  }

  const [formData, setFormData] = useState({
    userType: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    if (name === "email" && !isValidEmail(value)) {
      setError("Invalid email format! Enter correct email.");
      setErrorMsg("Invalid email format! Enter correct email.");
      toast.error("Invalid email format");
      setLoginEmail("");

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error message if the email becomes valid
    if (name === "email" && isValidEmail(value)) {
      setError(null);
      setErrorMsg(null);
    }
  };

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  // ///////////////////////////////////////////// SIGN UP HANDELING /////////////////////////////////////////////
  const createAccount = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, userType } = formData;

    if (!email || !password || !userType) {
      setError("All fields are required!");
      setErrorMsg("All fields are required!");
      toast.error("All fields are required!");

      return;
    }

    const supabase = createClient();

    try {
      // Attempt to sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { userType: userType },
        },
      });

      if (error) {
        // Check if the error message indicates that the email is already used
        if (error.message.includes("already registered")) {
          setError("This email is already used!");
          setErrorMsg("This email is already used!");
          toast.error("This email is already used!");
        } else {
          // Handle other sign-up errors
          console.error("Error signing up!", error.message);
          setError("Error signing up!");
          setErrorMsg("Error signing up!");
          toast.error("Error signing up!");
        }
        setLoginPassword(""); // Clear password field on error

        return;
      }

      console.log("User signed up!", data);

      // Insert the profile manually after registration based on userType
      if (userType === "tea_supplier") {
        await supabase.from("profiles_suppliers").insert({ id: data.user?.id });
      } else if (userType === "tea_factory") {
        await supabase.from("profiles_factories").insert({ id: data.user?.id });
      }

      // Success message
      setError("Account created successfully!");
      setErrorMsg("Account created successfully!");
      toast.success("Account created successfully!");
      setAuthCard("Sign In");
    } catch (error) {
      console.error("Unexpected error during account creation:", error);
      setError("Please try again!");
      setErrorMsg("Please try again!");
      toast.error("Unexpected error during sign-up!");
      setLoginPassword(""); // Clear password field on unexpected error
    }
  };

  return (
    <div className="z-50">
      <form onSubmit={createAccount}>
        <Select
          disableSelectorIconRotation
          required
          className="max-w-xs"
          disabled={authCard === "Sign In"}
          id="userType"
          label="User Type"
          labelPlacement="outside"
          name="userType"
          placeholder="Select who are you?"
          selectorIcon={<SelectorIcon />}
          onChange={handleChange}
        >
          {userType.map((user) => (
            <SelectItem
              key={user.key}
              isDisabled={authCard === "Sign In"}
              value={user.key}
            >
              {user.label}
            </SelectItem>
          ))}
        </Select>
        <br />

        <div className="mt-5">
          <Input
            required
            disabled={authCard === "Sign In"}
            id="userNameR"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="you@example.com"
            startContent={<FaEnvelope className="text-default-400" />}
            type="email"
            onChange={handleChange}
          />
        </div>
        <br />

        <div className="mt-5">
          <Input
            required
            className="md:w-[300px] w-[225px]"
            disabled={authCard === "Sign In"}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityR}
              >
                {isVisibleR ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            id="passwordR"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            startContent={<FaLock className="text-default-400" />}
            type={isVisibleR ? "text" : "password"}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center">
          <button
            className={clsx(
              "w-[175px] border-2 border-cyan-600 hover:border-lime-600 text-green-950 dark:text-white font-bold py-2 mt-5 px-4 rounded-3xl mb-4",
              {
                "pointer-events-none opacity-50": authCard === "Sign In",
              },
            )}
            disabled={authCard === "Sign In"}
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
