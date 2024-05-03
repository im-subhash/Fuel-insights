import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa"; // Importing FaBars for menu icon
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((store) => store.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(addUser(null));
    setMenuOpen(!menuOpen);
    navigate("/");
  };

  const handleDropdownClick = (path) => {
    setMenuOpen(!menuOpen);
    navigate(path);
  };

  return (
    <div className="py-3 px-6 bg-black text-white relative">
      <div className="flex justify-between items-center">
        {/* logo */}
        <Link
          to="/"
          className=" text-2xl md:text-3xl font-Michroma text-red-600 "
        >
          Fuel Insights
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl lg:hidden"
        >
          <FaBars />
        </button>

        {
          <div className="lex gap-2  lg:block hidden text-xl ">
            <Link to="/" className="nav-link py-2 px-3 hover:bg-gray-700">
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="nav-link py-2 px-3 hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <Link
                  to="/tripAnalysis"
                  className="nav-link py-2 px-3 hover:bg-gray-700"
                >
                  Trip Analysis
                </Link>
                <Link
                  to="/liveTracking"
                  className="nav-link py-2 px-3 hover:bg-gray-700"
                >
                  Live Tracking
                </Link>
              </>
            )}
            <Link
              to="/aboutus"
              className="nav-link py-2 px-3 hover:bg-gray-700"
            >
              About Us
            </Link>
            <Link
              to="/contactus"
              className="nav-link py-2 px-3 hover:bg-gray-700"
            >
              Contact Us
            </Link>
            {user ? (
              <button
                onClick={() => handleLogout()}
                className="nav-link py-2 px-3 hover:bg-gray-700 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button className="nav-link py-2 px-4 hover:bg-gray-700">
                <FaUserCircle />
              </button>
            )}
          </div>
        }
      </div>

      {/* Dropdown menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute z-50 top-full left-0 w-full bg-black text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col">
          <Link
            to="/"
            className="nav-link py-2 px-4 hover:bg-gray-700"
            onClick={() => handleDropdownClick("/")}
          >
            Home
          </Link>
          {user && (
            <>
              <Link
                to="/dashboard"
                className="nav-link py-2 px-4 hover:bg-gray-700"
                onClick={() => handleDropdownClick("/dashboard")}
              >
                Dashboard
              </Link>
              <Link
                to="/tripAnalysis"
                className="nav-link py-2 px-4 hover:bg-gray-700"
                onClick={() => handleDropdownClick("/tripAnalysis")}
              >
                Trip Analysis
              </Link>
              <Link
                to="/liveTracking"
                className="nav-link py-2 px-4 hover:bg-gray-700"
                onClick={() => handleDropdownClick("/liveTracking")}
              >
                Live Tracking
              </Link>
            </>
          )}
          <Link
            to="/aboutus"
            className="nav-link py-2 px-4 hover:bg-gray-700"
            onClick={() => handleDropdownClick("/aboutus")}
          >
            About Us
          </Link>
          <Link
            to="/contactus"
            className="nav-link py-2 px-4 hover:bg-gray-700"
            onClick={() => handleDropdownClick("/contactus")}
          >
            Contact Us
          </Link>
          {user ? (
            <button
              onClick={() => handleLogout()}
              className="nav-link py-2 px-4 hover:bg-gray-700 "
            >
              Logout
            </button>
          ) : (
            <button className="nav-link py-2 px-4 hover:bg-gray-700">
              <FaUserCircle />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
