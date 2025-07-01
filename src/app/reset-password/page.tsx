"use client";
import { useState } from "react";
import { updatePassword } from "../auth/actions";
import Image from "next/image";
import sideImage from "../../assets/side-image.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPasswordPage() {
 
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


 

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); 
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");  
    if (typeof password !== "string" || typeof confirmPassword !== "string") {
      setErrorMessage("Invalid form data. Please try again.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    const result = await updatePassword(formData);
    if (!result || !("success" in result)) {
      setErrorMessage("An unexpected error occurred while updating your password.");
      return;
    }
    if (!result.success) {    

      setErrorMessage(result.error ?? "Failed to update password.");
    }
    else {
      setSuccessMessage("Password updated successfully. You can now log in.");
      setErrorMessage("");
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 2000);
    }
  };  

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-[#fefcf9] to-[#efedea] px-6 py-12 lg:px-20 gap-12 lg:gap-24 relative overflow-hidden">
      <div className="hidden lg:flex w-[50%] max-w-2xl flex-shrink-0 items-center justify-center ">
        <Image
          src={sideImage}
          alt="Aurena Jewelry"
          className="rounded-2xl object-cover h-[80vh] w-full transition-transform duration-700 ease-in-out hover:scale-105"
          priority
          sizes="(max-width: 1200px) 50vw, 50vw"
        />
      </div>

      <div className="w-full max-w-lg flex-shrink-0 bg-white/90 backdrop-blur rounded-3xl p-10 md:p-14 border border-neutral-200 transition-colors duration-300 hover:border-[#d5bfa3]">
        <h2 className="text-4xl font-extrabold text-neutral-900 text-center mb-8 font-serif tracking-tight">
          Reset Your <span className="text-[#d5bfa3]">Aurena</span> Password
        </h2>

        <p className="text-center text-neutral-600 text-base mb-10 font-light italic">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Create a password"
              aria-label="New password"
              className="block w-full border border-neutral-300 rounded-md px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-[#d5bfa3] focus:ring-2 focus:ring-[#d5bfa3]/50 transition duration-300 text-base"
            />
            <span
              className="absolute right-4 top-11 text-neutral-400 cursor-pointer hover:text-[#d5bfa3] transition"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Repeat your password"
              aria-label="Confirm your password"
              className="block w-full border border-neutral-300 rounded-md px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-[#d5bfa3] focus:ring-2 focus:ring-[#d5bfa3]/50 transition duration-300 text-base"
            />
          </div>

          {successMessage && (
            <p className="text-green-600 text-sm font-semibold">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>
          )}

          <button type="submit" className="w-full bg-[#d5bfa3] text-white rounded-md py-4 font-bold">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
