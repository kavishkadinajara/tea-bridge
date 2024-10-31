"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { FaEnvelope } from "react-icons/fa";

import { createClient } from "@/lib/utils/supabase/client";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://your-app.com/reset-password", // Change to your actual redirect URL
      });

      if (error) {
        setError("Failed to send reset email. Please try again.");
      } else {
        setMessage(
          "If an account with that email exists, you will receive a password reset email shortly.",
        );
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md p-8 transition duration-300 ease-in-out z-50 rounded-2xl shadow-lg shadow-cyan-600 hover:shadow-lime-500 w-full bg-green-100 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a0015] via-[#00150e] to-black">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Password Reset
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              id="email"
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="you@example.com"
              startContent={<FaEnvelope className="text-default-400" />}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="w-full  border-2 border-cyan-600 hover:border-lime-600 text-green-950 dark:text-white font-bold py-2 mt-5 px-4 rounded-3xl mb-4 transition duration-200 ease-in-out"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm font-medium text-center rounded-3xl text-green-600 bg-green-100 p-2 dark:bg-green-800 dark:text-green-100">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-sm font-medium text-center text-red-600 bg-red-100 rounded-3xl p-2 dark:bg-red-800 dark:text-red-100">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
