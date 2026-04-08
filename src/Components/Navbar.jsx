import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../api/AuthService";

function Navbar() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar shadow bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            {authenticated && (
              <li><Link to="/generate-resume">Build Resume</Link></li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          AI Resume Maker
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          {authenticated && (
             <li><Link to="/generate-resume">Build Resume</Link></li>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {authenticated ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-medium">Hi, {user.name}</span>
            <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
