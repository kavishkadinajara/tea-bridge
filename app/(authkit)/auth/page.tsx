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
import CryptoJS from "crypto-js";

import { createClient } from "@/lib/utils/supabase/client"; // Ensure this is the correct path to your supabaseClient.js
import LoginHero from "@/components/LoginHero";
import { SelectorIcon } from "@/components/SelectorIcon";
import { userType } from "@/config/data";

const SECRET_KEY = "your-secret-key"; // Replace with your actual secret key

export default function LoginPage({}: { status: string }) {
  const router = useRouter();

  const [isErrorMsg, setErrorMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError("Invalid email format! Enter correct email.");
      setErrorMsg("Invalid email format! Enter correct email.");
      toast.error("Invalid email format");

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

    if (!email || !password || !userType) {
      setError("All fields are required!");
      setErrorMsg("All fields are required!");
      toast.error("All fields are required!");

      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { userType: userType },
      },
    });

    if (error) {
      console.error("Error signing up!", error.message);
      setError("Error signing up!");
      setErrorMsg("Error signing up!");
      toast.error("Error signing up!");
    } else {
      console.log("User signed up!", data);

      // Insert the profile manually after registration
      if (userType === "tea_supplier") {
        await supabase.from("profiles_suppliers").insert({ id: data.user?.id });
      } else if (userType === "tea_factory") {
        await supabase.from("profiles_factories").insert({ id: data.user?.id });
      }

      setError("Account created successfully!");
      setErrorMsg("Account created successfully!");
      toast.success("Account created successfully!");
      setAuthCard("Sign In");
    }
  };

  // HANDLING LOGIN //////////////////////////////////  ///////////////////////////////////////////
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!isValidEmail(email)) {
      setError("Invalid email format! Enter correct email.");
      setErrorMsg("Invalid email format! Enter correct email.");
      toast.error("Invalid email format");

      return;
    }

    try {
      const supabase = createClient();

      // Check for existing login attempts
      let { data: loginAttempt } = await supabase
        .from("login_attempts")
        .select("*")
        .eq("email", email)
        .single();

      if (
        loginAttempt &&
        loginAttempt.blocked_until &&
        new Date(loginAttempt.blocked_until) > new Date()
      ) {
        const remainingTime = Math.ceil(
          (new Date(loginAttempt.blocked_until).getTime() -
            new Date().getTime()) /
            60000,
        );

        // Reset attempts if remainingTime is 0
        if (remainingTime <= 0) {
          await supabase
            .from("login_attempts")
            .update({
              attempts: 0,
              blocked_until: null,
            })
            .eq("email", email);

          setError("Your account is now unlocked. Please try again.");
          setErrorMsg("Your account is now unlocked. Please try again.");
          toast.success("Your account is now unlocked. Please try again.");
        } else {
          setError(
            `Account is locked. Try again in ${remainingTime} minute(s).`,
          );
          setErrorMsg(
            `Account is locked. Try again in ${remainingTime} minute(s).`,
          );
          toast.error(
            `Account is locked. Try again in ${remainingTime} minute(s).`,
          );

          return;
        }
      }

      // Attempt to sign in the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error signing in:", error.message);

        // Increment the failed attempt counter
        if (!loginAttempt) {
          await supabase.from("login_attempts").insert({ email, attempts: 1 });
        } else {
          const newAttempts = loginAttempt.attempts + 1;
          let blocked_until = null;

          if (newAttempts >= 3) {
            blocked_until = new Date(new Date().getTime() + 15 * 60000); // Block for 15 minutes
          }

          await supabase
            .from("login_attempts")
            .update({
              attempts: newAttempts,
              last_attempt: new Date(),
              blocked_until,
            })
            .eq("email", email);
        }

        setError("Invalid username or password! Please try again.");
        setErrorMsg("Invalid username or password! Please try again.");
        toast.error("Invalid username or password! Please try again.");

        return;
      }

      // Reset login attempts on successful login
      if (loginAttempt) {
        const { error } = await supabase
          .from("login_attempts")
          .update({ attempts: 0, blocked_until: null })
          .eq("email", email);

        if (error) {
          console.error("Error resetting login attempts:", error.message);
        }
      }

      // Display success messages
      setError("Logged in successfully!");
      setErrorMsg("Logged in successfully!");
      toast.success("Logged in successfully!");

      // Redirect based on user type
      const userType = data?.user?.user_metadata?.userType;
      const userEmail = data?.user?.user_metadata?.email;
      const userId = userEmail ? userEmail.split("@")[0] : null;

      if (userType === "tea_supplier") {
        router.push(`/my_dashboard/${userId}`);
      } else {
        router.push(`/dashboard/${userId}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Please try again!");
      setErrorMsg("Please try again!");
      toast.error("Unexpected error during sign-in");
    }
  };

  return (
    <div className="flex md:flex-col lg:flex-row-reverse overflow-x-hidden w-full  justify-center items-center space-x-8">
      <div className="hidden md:block ">
        <LoginHero />
      </div>

      <div className="flex flex-col justify-center items-center min-h-[680px] mt-4 px-0 md:px-0 lg:px-8">
        <div className="lg:col-span-1 md:shadow-lg m-6 md:shadow-cyan-600 md:hover:shadow-lime-500 rounded-3xl">
          <div className="flex justify-center md:mb-4">
            <div className="z-50">
              <Link href={"/"}>
                <Image
                  alt={"logo"}
                  className="w-12 h-12 lg:w-24 lg:h-24"
                  height={90}
                  src={"/logo.png"}
                  width={90}
                />
              </Link>
            </div>
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
                    "left-28 backdrop-blur-3xl blur-[2px] z-0":
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
          <div>
            <h2 className="text-lg text-red-700 text-center">{isErrorMsg}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
