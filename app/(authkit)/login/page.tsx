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
  const toggleVisibility = () => setIsVisible(!isVisible);

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
        <div className="lg:col-span-1 bg-transparent shadow-lg p-6 w-full shadow-cyan-600 hover:shadow-lime-500 rounded-3xl">
          
          {/* Logo and heading */}
          <div className="flex justify-center mb-4">
            <Image src={"/logo.png"} alt={"logo"} width={90} height={90} className="w-20 lg:w-24" />
            <h1 className="text-3xl text-center font-bold mt-8">{authCard}</h1><br />
          </div>

          {/* Container for both login methods */}
          <div className="flex justify-center items-center">
            
            {/* First card for login */}
            <div className={clsx(
              "p-8 rounded-2xl shadow-lg shadow-cyan-600 hover:shadow-lime-500 w-full max-w-sm  relative",
              {
                "scale-75 z-0 left-16": authCard === "Sign In",
                "scale-100 z-20 left-32 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black": authCard === "Sign Up"
              }
            )}>
              <Select
                label="User Type"
                placeholder="Select who are you?"
                labelPlacement="outside"
                className="max-w-xs"
                disableSelectorIconRotation
                selectorIcon={<SelectorIcon />}
              >
                {userType.map((userType) => (
                  <SelectItem key={userType.key}>
                    {userType.label}
                  </SelectItem>
                ))}
              </Select>
              <h2 className="text-white text-sm font-semibold mb-2 text-center">Login with</h2>
              <GoogleButton/>
              <h2 className='text-center font-semibold'>or</h2>
              <form>
                {/* Email input */}
                <div className="mt-4">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={<FaEnvelope className="text-default-400" />}
                  />
                </div><br />
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
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <FaEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    className="w-[300px] "
                  />
                </div>
                <div className='flex justify-center'>
                  <button className="text-cyan-600 text-sm mt-4 hover:text-lime-600  text-center">
                    Forgot your password?
                  </button>
                </div>
                {/* Submit button */}
                <div className='flex justify-center'>
                  <button type="submit" className="w-[175px] border-2 border-cyan-600 hover:border-lime-600  text-white font-bold py-2 mt-5 px-4 rounded-3xl mb-4">
                    Register
                  </button>
                </div>
              </form>
              {/* Register link */}
              <p className="text-gray-400 mt-4 text-center">
                Don’t have an account? <a href="#" className="text-blue-400">Sign In</a>
              </p>
            </div>

            {/* Second card for login */}
            <div className={clsx(
              "p-8 rounded-2xl shadow-lg shadow-cyan-600 hover:shadow-lime-500 w-full max-w-sm  relative hidden",
              {
                "scale-80 z-0 right-16": authCard === "Sign Up",
                "scale-100 z-20 right-32 bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black": authCard === "Sign In"
              }
            )}>

              <h2 className="text-white text-sm font-semibold mb-2 text-center">Login with</h2>
              <GoogleButton/>
              <h2 className='text-center font-semibold'>or</h2>
              <form>
                {/* Email input */}
                <div className="mt-4">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={<FaEnvelope className="text-default-400" />}
                  />
                </div><br />
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
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <FaEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    className="w-[300px] "
                  />
                </div>
                <div className='flex justify-center'>
                  <button className="text-cyan-600 text-sm mt-4 hover:text-lime-600  text-center">
                    Forgot your password?
                  </button>
                </div>
                {/* Submit button */}
                <div className='flex justify-center'>
                  <button type="submit" className="w-[175px] border-2 border-cyan-600 hover:border-lime-600  text-white font-bold py-2 mt-5 px-4 rounded-3xl mb-4">
                    Login
                  </button>
                </div>
              </form>
              {/* Login link */}
             <div className='flex justify-center'>
              <button 
                className="text-cyan-600 hover:text-lime-600 mt-4 text-center"
                onClick={toggleTwoAuth}>
                Don't have an account? Sign Up.
                </button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
