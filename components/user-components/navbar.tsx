"use client";

import { ArrowRight, Medal, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full mb-7 sticky top-0 z-50 ">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full py-6 px-6  mx-auto  bg-gray-900 z-50 ">
        <div className="flex items-center gap-4">
          <Link className="text-orange-600 font-bold text-3xl" href='/'>TechTrail</Link>
        </div>
        <ul className="hidden sm:flex gap-8">
          <li className="text-2xl font-bold border-b-2 border-transparent text-gray-300  hover:text-orange-600 hover:border-gray-300 cursor-pointer transition duration-300">
            <Link href="/courses">Courses</Link>
          </li>
          <li className="text-2xl font-bold text-orange-600 border-b-2 border-transparent hover:border-gray-300 cursor-pointer transition duration-300">
            <Link href="/">Docs</Link>
          </li>
          <li className="text-2xl font-bold text-orange-600 border-b-2 border-transparent hover:border-gray-300 cursor-pointer transition duration-300">
            <Link href="/">Podcast</Link>
          </li>
        </ul>
        <div className="sm:hidden flex items-end" onClick={handleMenuClick}>
          <button>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Mobile Menu */}

        <div
          className={`absolute top-16 left-0 right-0  mt-2  bg-gray-700 z-50 bg-opacity-90 p-4  rounded ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col gap-4">
            <li className="text-2xl font-bold text-white hover:text-orange-600 transition duration-300 text-center cursor-pointer">
              <Link href="/courses">Courses</Link>
            </li>
            <li className="text-2xl font-bold text-orange-600 hover:text-white transition duration-300 text-center cursor-pointer">
              Docs
            </li>
            <li className="text-2xl font-bold text-orange-600 hover:text-white transition duration-300 text-center cursor-pointer">
              Podcast
            </li>
          </ul>
        </div>
      </div>

      
    </div>
  );
}

export default Navbar;
