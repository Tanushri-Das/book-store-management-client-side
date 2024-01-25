"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const toggleNavbar = () => {
    setIsClick(!isClick);
  };
  const closeNavbar = () => {
    setIsClick(false);
  };
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white">
                Logo
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <Link
                href="/"
                className="text-white hover:bg-white hover:text-black rounded-lg py-2 px-3"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:bg-white hover:text-black rounded-lg py-2 px-3"
              >
                About
              </Link>
              <Link
                href="/shop"
                className="text-white hover:bg-white hover:text-black rounded-lg py-2 px-3"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              {!isClick ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isClick && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={closeNavbar}
              className="text-white hover:bg-white hover:text-black rounded-lg py-2 px-3 block"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeNavbar}
              className="text-white hover:bg-white hover:text-black rounded-lg py-2 px-3 block"
            >
              About
            </Link>
            <Link
              href="/shop"
              onClick={closeNavbar}
              className="text-white hover:bg-white hover:text-black rounded-lg py-2 px-3"
            >
              Shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
