import React from "react";
import Link from "next/link";

function Navigation() {
  return (
    <nav className="bg-[#172a3e] text-white uppercase w-full h-full z-10 flex items-center justify-center">
      <ul className="flex flex-col gap-4 text-center text-xl font-medium p-8 tracking-wider">
        {[
          { href: "/", label: "Earrings" },
          { href: "/", label: "Rings" },
          { href: "/", label: "Bracelets" },
          { href: "/", label: "Necklaces" },
        ].map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="transition-all duration-300 hover:text-[#f3d9b2] focus:text-[#f3d9b2] focus:outline-none"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
