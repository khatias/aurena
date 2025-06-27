import React from "react";
import Link from "next/link";

function Navigation() {
  return (
<nav className="bg-[#172a3e] text-white uppercase w-full h-full z-10 flex items-center justify-center
                md:bg-white md:text-primaryBlue md:justify-center border-y-1  border-primaryBlue">
  <ul className="flex flex-col gap-4 text-center text-xl font-medium p-8 tracking-wider
                 md:flex-row md:gap-4 md:text-sm md:uppercase md:p-3
                 lg:gap-6 lg:text-sm lg:p-4"> 
    {[
      { href: "/", label: "Earrings" },
      { href: "/", label: "Rings" },
      { href: "/", label: "Bracelets" },
      { href: "/", label: "Necklaces" },
      { href: "/", label: "Sale" },
      { href: "/", label: "Contact" },
      { href: "/", label: "About us" },
    ].map(({ href, label }) => (
      <li key={label}>
        <Link
          href={href}
          className="transition-all duration-300 hover:text-[#f3d9b2] focus:text-[#f3d9b2] focus:outline-none hover:offset-4"
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
