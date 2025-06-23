import React from "react";
import Image from "next/image";
import logo from "../../assets/aurena-logo6.png"; 
import Banner from "../Banner/Banner";
function Header() {
  return (
    <header className="">
<Banner />
      <div className="">
       <Image
          src={logo.src}
          alt="Aurena Logo"
          width={150}
          height={50}
          className="inline-block rounded-4xl"
        />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
