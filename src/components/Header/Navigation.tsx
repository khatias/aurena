import React from "react";
import Link from "next/link";
function Navigation() {
  return (
    <nav className="bg-[#172a3e]  text-white fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center">
      <ul className="flex flex-col gap-2 text-center text-lg font-semibold p-4 ">
        <li>
          <Link href="/" className="hover:underline">
            earings
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:underline">
            rings
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:underline">
            bracelets
          </Link>
        </li>

        <li>
          <Link href="/" className="hover:underline">
            necklaces
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
