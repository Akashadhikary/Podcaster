import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMenuBook } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [mobileView, setMobileView] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
    { name: "All Podcasts", link: "/all-podcasts" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-5 md:px-8 lg:px-12 py-2 bg-blue-100 shadow-md">
        <div className="flex justify-between items-center ">
          <div className="logo brand-name w-2/6">
            <Link
              className="text-2xl font-semibold flex justify-start items-center gap-2"
              to="/"
            >
              <img className="w-11 h-11" src="podcast.jpg" alt="error" />
              PODCASTER
            </Link>
          </div>
          <div className="w-2/6 lg:flex hidden items-center justify-center">
            {navLinks.map((item, i) => (
              <div
                key={i}
                className="ml-4 hover:bg-gray-100 rounded transition-all duration-300"
              >
                <Link
                  to={item.link}
                  className="block py-2 px-3 hover:font-semibold"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {!isLoggedIn && (
            <div className="w-2/6 lg:flex hidden items-center justify-end gap-2">
              <Link
                to="/signin"
                className="px-4 py-2 border rounded-full border-black"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border rounded-full bg-black text-white"
              >
                Sign Up
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div className="w-2/6 lg:flex hidden items-center justify-end gap-2">
              <Link
                to="/profile"
                className="px-4 py-2 border rounded-full bg-black text-white"
              >
                Profile
              </Link>
            </div>
          )}

          <div className="w-4/6 lg:hidden flex items-center justify-end z-50">
            <button
              className="text-4xl"
              onClick={() => setMobileView(!mobileView)}
            >
              {mobileView ? <CgClose /> : <MdOutlineMenuBook />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileView && (
          <div className="lg:hidden flex flex-col items-center bg-blue-100 py-4">
            {navLinks.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="block py-2 px-3 text-lg hover:bg-gray-200 w-full text-center"
                onClick={() => setMobileView(false)}
              >
                {item.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  to="/signin"
                  className="px-4 py-2 border rounded-full border-black text-center"
                  onClick={() => setMobileView(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border rounded-full bg-black text-white text-center"
                  onClick={() => setMobileView(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  to="/profile"
                  className="px-4 py-2 border rounded-full bg-black text-white text-center"
                  onClick={() => setMobileView(false)}
                >
                  Profile
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
