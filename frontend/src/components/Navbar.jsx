import React from "react";
import { Link } from "react-router-dom";
import { HiSearch, HiBell, HiChat } from "react-icons/hi";

const Navbar = ({ user }) => {
  return (
    <div className="bg-white shadow-md fixed top-0 left-0 w-full z-50"> {/* Fixed the navbar at top */}
      <div className="flex gap-3 md:gap-2 items-center p-5 max-w-screen-xl mx-auto"> {/* Center the content */}
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img
            src="/TrendyLOGOhor.png"
            alt="Logo"
            width={150} 
            height={150} 
            className="'hover:bg-gray-300 p-2 rounded_full cursor-pointer'"
          />
        </Link>
        <Link to="/" className="bg-black text-white p-2 px-4 rounded-full">
          Home
        </Link>

        {/* Search Bar */}
        <div className="bg-[#e9e9e9] p-3 gap-3 items-center rounded-full w-full hidden md:flex">
          <HiSearch className="text-[25px] text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none"
          />
        </div>

        <HiSearch className='text-[25px] text-gray-500 md:hidden' />

        {/* Navigation Links and User Section */}
        <div className="flex items-center space-x-4">
          <Link to="/create" className="font-semibold p-2 px-4 rounded-full hidden md:block">
            Create
          </Link>

          {/* Notification and Messages Icons */}
          <HiBell className="text-[25px] text-gray-500 cursor-pointer" />
          <HiChat className="text-[25px] text-gray-500 cursor-pointer" />

          {/* User Profile */}
          {user ? (
            <Link
              to="/account"
              className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xl text-gray-700"
            >
              {user.name.slice(0, 1)} {/* Display the first letter of the user's name */}
            </Link>
          ) : (
            <Link to="/sign-in" className="font-semibold text-gray-700 hover:text-gray-900 hidden md:block">
              Login
            </Link>
          )}

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/create" className="text-gray-700 hover:text-gray-900">
              Create
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
