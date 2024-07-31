"use client";

// Import necessary modules and components
import { FaGithub, FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from "next/link";
import LoginHero from "@/components/LoginHero";
import GoogleButton from "@/components/GoogleButton";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import clsx from 'clsx';
import {Select, SelectItem} from "@nextui-org/react";
import {SelectorIcon} from "@/components/SelectorIcon";
import {userType} from "@/config/data";

// Define the LoginPage component
export default function LoginPage({ status }: { status: string }) {

  // State to manage password visibility
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibilityR = () => setIsVisible(!isVisible);
  const toggleVisibilityL = () => setIsVisible(!isVisible);

  // Initialize the state for authCard
  const [authCard, setAuthCard] = useState("Sign In");

  // Function to toggle between "Sign In" and "Sign Up"
  function toggleTwoAuth() {
    setAuthCard(prevAuthCard => prevAuthCard === "Sign In" ? "Sign Up" : "Sign In");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-center items-center space-x-12">
      
      {/* Left section with a hero image, visible only on large screens */}
      <div className="hidden lg:block lg:col-span-1">
        <LoginHero />
      </div>

      {/* Right section with the login form */}
      <div className="flex flex-col justify-center items-center min-h-[680px] mt-4">
        <div className="lg:col-span-1 md:shadow-lg p-6 w-full md:shadow-cyan-600 md:hover:shadow-lime-500 rounded-3xl">
          
          {/* Logo and heading */}
          <div className="flex justify-center md:mb-4">
            <Link href={'/'}><Image src={"/logo.png"} alt={"logo"} width={90} height={90} className="w-12 h-12 lg:w-24 lg:h-24" /></Link>
            <h1 className="text-lg md:text-2xl lg:text-3xl text-center font-bold mt-3 md:mt-8">{authCard}</h1><br />
          </div>

          {/* Container for both login methods */}
          <div className="flex justify-center items-center">
            
            {/* First card for register */}
            <div className="flex justify-center items-center">
              <motion.div
                animate={{ opacity: authCard === "Sign In" ? 0.5 : 1, scale: authCard === "Sign In" ? 0.75 : 1 }}
                transition={{ duration: 0.5 }}
                className={clsx(
                  "p-8 rounded-2xl shadow-lg shadow-cyan-600 hover:shadow-lime-500 w-full max-w-sm relative mb-6",
                  {
                    "left-16 backdrop-blur-3xl blur-[2px] z-0": authCard === "Sign In",
                    "left-28 md:left-32 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black z-20": authCard === "Sign Up"
                  }
                )}
              >
                <form>
                <Select
                  label="User Type"
                  placeholder="Select who are you?"
                  labelPlacement="outside"
                  className="max-w-xs"
                  disableSelectorIconRotation
                  selectorIcon={<SelectorIcon />}
                  disabled={authCard === "Sign In"}
                >
                  {userType.map((userType) => (
                    <SelectItem key={userType.key}
                    isDisabled={authCard === "Sign In"}>
                      {userType.label}
                    </SelectItem>
                  ))}
                </Select>
                <br />
                
                  {/* Email input */}
                  <div className="mt-5">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="you@example.com"
                      labelPlacement="outside"
                      startContent={<FaEnvelope className="text-default-400" />}
                      disabled={authCard === "Sign In"}
                    />
                  </div>
                  <br />

                  {/* Password input */}
                  <div className="mt-5">
                    <Input
                      type={isVisible ? "text" : "password"}
                      label="Password"
                      placeholder="Enter your password"
                      labelPlacement="outside"
                      startContent={<FaLock className="text-default-400" />}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibilityR}
                          aria-label="toggle password visibility"
                          // disabled={authCard === "Sign In"}
                        >
                          {isVisible ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      className="md:w-[300px] w-[225px]"
                      disabled={authCard === "Sign In"}
                    />
                  </div>
                  {/* <div className="flex justify-center">
                    <button
                      className={clsx("text-cyan-600 text-sm mt-4 hover:text-lime-600 text-center", {
                        "pointer-events-none opacity-50": authCard === "Sign In"
                      })}
                      disabled={authCard === "Sign In"}
                    >
                      Forgot your password?
                    </button>
                  </div> */}
                  {/* Submit button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className={clsx("w-[175px] border-2 border-cyan-600 hover:border-lime-600 text-green-950 dark:text-white font-bold py-2 mt-5 px-4 rounded-3xl mb-4", {
                        "pointer-events-none opacity-50": authCard === "Sign In"
                      })}
                      disabled={authCard === "Sign In"}
                    >
                      Register
                    </button>
                  </div>
                </form>
                {/* Register link */}
                <div className="flex justify-center">
                  <button
                    className="text-cyan-600 hover:text-lime-600 mt-4 text-center"
                    onClick={toggleTwoAuth}
                    disabled={authCard === "Sign In"}
                  >
                    Already have an account? Sign In.
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Second card for login */}
            <div className="flex justify-center items-center">
              <motion.div
                animate={{ opacity: authCard === "Sign Up" ? 0.5 : 1, scale: authCard === "Sign Up" ? 0.75 : 1 }}
                transition={{ duration: 0.5 }}
                className={clsx(
                  "p-8 rounded-2xl shadow-lg shadow-cyan-600 hover:shadow-lime-500 w-full max-w-sm relative",
                  {
                    "right-28 blur-[2px] z-0": authCard === "Sign Up",
                    "right-40 md:right-32 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black z-30": authCard === "Sign In"
                  }
                )}
              >
                <form>
                  {/* Email input */}
                  <div className="mt-4">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="you@example.com"
                      labelPlacement="outside"
                      startContent={<FaEnvelope className="text-default-400" />}
                      disabled={authCard === "Sign Up"}
                    />
                  </div>
                  <br />
                  {/* Password input */}
                  <div className="mt-6">
                    <Input
                      type={isVisible ? "text" : "password"}
                      label="Password"
                      placeholder="Enter your password"
                      labelPlacement="outside"
                      startContent={<FaLock className="text-default-400" />}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibilityL}
                          aria-label="toggle password visibility"
                          // disabled={authCard === "Sign Up"}
                        >
                          {isVisible ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      className="md:w-[300px] w-[225px]"
                      disabled={authCard === "Sign Up"}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className={clsx("text-cyan-600 text-sm mt-4 hover:text-lime-600 text-center", {
                        "pointer-events-none opacity-50": authCard === "Sign Up"
                      })}
                      disabled={authCard === "Sign Up"}
                    >
                      Forgot your password?
                    </button>
                  </div>
                  {/* Submit button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className={clsx("w-[175px] border-2 border-cyan-600 hover:border-lime-600 text-green-950 dark:text-white font-bold py-2 mt-5 px-4 rounded-3xl mb-4", {
                        "pointer-events-none opacity-50": authCard === "Sign Up"
                      })}
                      disabled={authCard === "Sign Up"}
                    >
                      Login
                    </button>
                  </div>
                </form>
                {/* Login link */}
                <div className="flex justify-center">
                  <button
                    className="text-cyan-600 hover:text-lime-600 mt-4 text-center"
                    onClick={toggleTwoAuth}
                    disabled={authCard === "Sign Up"}
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
