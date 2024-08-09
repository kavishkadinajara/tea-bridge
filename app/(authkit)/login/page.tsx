/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
"use client";

import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import React, { FormEvent, useState } from "react";
import clsx from "clsx";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import CryptoJS from "crypto-js";

import { createClient } from "@/lib/utils/supabase/client"; // Ensure this is the correct path to your supabaseClient.js
import LoginHero from "@/components/LoginHero";
import { SelectorIcon } from "@/components/SelectorIcon";
import { userType } from "@/config/data";

const SECRET_KEY = "your-secret-key"; // Replace with your actual secret key

export default function LoginPage({}: { status: string }) {
  const router = useRouter();

  const [isVisibleR, setIsVisibleR] = useState(false);
  const [isVisibleL, setIsVisibleL] = useState(false);

  const toggleVisibilityR = () => setIsVisibleR(!isVisibleR);
  const toggleVisibilityL = () => setIsVisibleL(!isVisibleL);

  const [authCard, setAuthCard] = useState("Sign In");

  function toggleTwoAuth() {
    setAuthCard((prevAuthCard) =>
      prevAuthCard === "Sign In" ? "Sign Up" : "Sign In",
    );
  }

  const [formData, setFormData] = useState({
    userType: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    if (name === "email" && !isValidEmail(value)) {
      toast.error("Invalid email format");

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  };

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, userType } = formData;

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");

      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          userType: userType,
        },
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
      toast.error("Error signing up");
    } else {
      console.log("User signed up:", data);
      toast.success("Account created successfully!");
      setAuthCard("Sign In");
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");

      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        toast.error("Error signing in");

        return; // Exit the function early if there's an error
      }

      console.log("User signed in:", data);
      toast.success("Logged in successfully!");

      if (data?.user?.user_metadata?.userType === "tea_provider") {
        router.push("/");
      } else {
        router.push("/dashboard"); // Redirect to dashboard or any other page
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error during sign in");
    }
  };

  // const handleLogin = async (e: FormEvent) => {
  //   e.preventDefault();
  //   const { email, password } = formData;

  //   // Encrypt email and password
  //   const encryptedEmail = encryptData(email);
  //   const encryptedPassword = encryptData(password);

  //   try {
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email: encryptedEmail,
  //       password: encryptedPassword,
  //     });

  //     if (error) {
  //       console.error("Error signing in:", error.message);
  //       toast.error("Error signing in");

  //       return; // Exit the function early if there's an error
  //     }

  //     console.log("User signed in:", data);
  //     toast.success("Logged in successfully!");

  //     if (data?.user?.user_metadata?.userType === "tea_provider") {
  //       router.push("/");
  //     } else {
  //       router.push("/dashboard"); // Redirect to dashboard or any other page
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //     toast.error("Unexpected error during sign in");
  //   }
  // };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-center items-center space-x-12">
      <div className="hidden lg:block lg:col-span-1">
        <LoginHero />
      </div>

      <div className="flex flex-col justify-center items-center min-h-[680px] mt-4">
        <div className="lg:col-span-1 md:shadow-lg p-6 w-full md:shadow-cyan-600 md:hover:shadow-lime-500 rounded-3xl">
          <div className="flex justify-center md:mb-4">
            <Link href={"/"}>
              <Image
                alt={"logo"}
                className="w-12 h-12 lg:w-24 lg:h-24"
                height={90}
                src={"/logo.png"}
                width={90}
              />
            </Link>
            <h1 className="text-lg md:text-2xl lg:text-3xl text-center font-bold mt-3 md:mt-8">
              {authCard}
            </h1>
            <br />
          </div>

          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center">
              <motion.div
                animate={{
                  opacity: authCard === "Sign In" ? 0.5 : 1,
                  scale: authCard === "Sign In" ? 0.75 : 1,
                }}
                className={clsx(
                  "p-8 rounded-2xl shadow-lg shadow-cyan-600 hover:shadow-lime-500 w-full max-w-sm relative mb-6",
                  {
                    "left-16 backdrop-blur-3xl blur-[2px] z-0":
                      authCard === "Sign In",
                    "left-28 md:left-32 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black z-20":
                      authCard === "Sign Up",
                  },
                )}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={createAccount}>
                  <Select
                    disableSelectorIconRotation
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
                          "pointer-events-none opacity-50":
                            authCard === "Sign In",
                        },
                      )}
                      disabled={authCard === "Sign In"}
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <div className="flex justify-center">
                  <button
                    className="text-cyan-600 hover:text-lime-600 mt-4 text-center"
                    disabled={authCard === "Sign In"}
                    onClick={toggleTwoAuth}
                  >
                    Already have an account? Sign In.
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center items-center">
              <motion.div
                animate={{
                  opacity: authCard === "Sign Up" ? 0.5 : 1,
                  scale: authCard === "Sign Up" ? 0.75 : 1,
                }}
                className={clsx(
                  "p-8 rounded-2xl shadow-lg shadow-cyan-600 hover:shadow-lime-500 w-full max-w-sm relative",
                  {
                    "right-28 blur-[2px] z-0": authCard === "Sign Up",
                    "right-40 md:right-32 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black z-20":
                      authCard === "Sign In",
                  },
                )}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleLogin}>
                  <div className="mt-5">
                    <Input
                      disabled={authCard === "Sign Up"}
                      id="userNameL"
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
                  <div className="mt-6">
                    <Input
                      className="md:w-[300px] w-[225px]"
                      disabled={authCard === "Sign Up"}
                      endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibilityL}
                        >
                          {isVisibleL ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      id="passwordL"
                      label="Password"
                      labelPlacement="outside"
                      name="password"
                      placeholder="Enter your password"
                      startContent={<FaLock className="text-default-400" />}
                      type={isVisibleL ? "text" : "password"}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className={clsx(
                        "text-cyan-600 text-sm mt-4 hover:text-lime-600 text-center",
                        {
                          "pointer-events-none opacity-50":
                            authCard === "Sign Up",
                        },
                      )}
                      disabled={authCard === "Sign Up"}
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className={clsx(
                        "w-[175px] border-2 border-cyan-600 hover:border-lime-600 text-green-950 dark:text-white font-bold py-2 mt-5 px-4 rounded-3xl mb-4",
                        {
                          "pointer-events-none opacity-50":
                            authCard === "Sign Up",
                        },
                      )}
                      disabled={authCard === "Sign Up"}
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="flex justify-center">
                  <button
                    className="text-cyan-600 hover:text-lime-600 mt-4 text-center"
                    disabled={authCard === "Sign Up"}
                    onClick={toggleTwoAuth}
                  >
                    Don't have an account? Sign Up.
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
