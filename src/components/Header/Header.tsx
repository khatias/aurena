"use client";
import React from "react";
import Image from "next/image";
import logo from "../../assets/aurena-logo4.png";

import Navigation from "./Navigation";
import Banner from "../Banner/Banner";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiHeart,
  FiSearch,
} from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { useState } from "react";

import Link from "next/link";
function Header() {
  const [isOpen, open] = useState(false);
  return (
    <header className="shadow-sm md:shadow-none bg-white  w-full z-50">
      <div>
        <Banner />
      </div>

      <div className="flex justify-between items-center px-4 py-2 md:pb-4 container mx-auto">
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2  bg-gray-50 rounded-3xl px-3 py-2  focus-within:ring-2 focus-within:ring-[#f3d9b2] transition">
            <FiSearch className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent text-sm placeholder-gray-400 w-full"
            />
          </div>
        </div>
        <div className="">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Aurena Logo"
              className="w-18 h-18 rounded-full md:w-20 md:h-20"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:flex-row-reverse">
          <Link href="/" className="text-lg font-semibold">
            <FiUser className=" text-xl" />
          </Link>
          <Link href="/" className="text-lg font-semibold">
            <FiShoppingCart className=" text-xl" />
          </Link>

          <Link href="/" className="text-lg font-semibold">
            <FiHeart className=" text-xl" />
          </Link>
          <button onClick={() => open(!isOpen)} className="md:hidden ">
            {" "}
            <FiMenu className=" text-xl" />
          </button>

          <div
            className={`top-0 right-0 fixed w-full h-full transition-transform duration-500 ease-linear ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={() => open(false)}
          >
            <div className="fixed top-4  right-4 z-20 ">
              <button className="" onClick={() => open(!isOpen)}>
                <TfiClose className="text-white" />
              </button>
            </div>
            <Navigation />
          </div>
        </div>
      </div>
      <div className="hidden md:flex container mx-auto">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
