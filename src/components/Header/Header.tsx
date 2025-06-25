"use client";
import React from "react";
import Image from "next/image";
import logo from "../../assets/aurena-logo4.png";
import Navigation from "./Navigation";
import Banner from "../Banner/Banner";
import { FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { useState } from "react";
import Link from "next/link";
function Header() {
  const [isOpen, open] = useState(false);
  return (
    <header className="">
      <div>
        <Banner />
      </div>

      <div className="flex justify-between items-center px-4 py-2  shadow-sm">
        <div className="">
          <Image
            src={logo}
            alt="Aurena Logo"
            className="w-18 h-18 rounded-full "
          />
        </div>
        <div className="flex items-center gap-4 ">
          <Link href="/" className="text-lg font-semibold">
            <FiShoppingCart className=" text-xl" />
          </Link>

          <Link href="/" className="text-lg font-semibold">
            <FiUser className=" text-xl" />
          </Link>

          <button onClick={() => open(!isOpen)}>
            {" "}
            <FiMenu className=" text-xl" />
          </button>

          <div
            className={` ${
              isOpen ? "w-full h-full" : " hidden w-0 h-0"
            } transition-transform duration-300`}
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
    </header>
  );
}

export default Header;
