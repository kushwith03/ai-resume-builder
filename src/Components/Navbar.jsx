import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../api/AuthService";
import { FaRocket, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = isAuthenticated();
  
  let user = { name: "User" };
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      user = storedUser;
    }
  } catch {}

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-0 z-[100] w-full border-b border-white/5 bg-base-100/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="navbar h-16 min-h-0 p-0">
          <div className="navbar-start">
            <Link to="/" className="flex items-center gap-2 group transition-all">
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <FaRocket className="text-primary text-xl" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">Resu<span className="text-primary">AI</span></span>
            </Link>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-1">
              {[
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.path) 
                        ? "text-white bg-white/5" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {authenticated && (
                <li>
                  <Link 
                    to="/generate-resume" 
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive("/generate-resume") 
                        ? "text-white bg-white/5" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Build Resume
                  </Link>
                </li>
              )}
            </ul>
          </div>
          
          <div className="navbar-end gap-3">
            {authenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                  <FaUserCircle className="text-slate-400 text-lg" />
                  <span className="text-xs font-bold text-slate-300 pr-1">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-ghost btn-sm text-xs font-bold text-slate-400 hover:text-error hover:bg-error/10 transition-all px-4"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm text-sm font-medium text-slate-300">Login</Link>
                <Link to="/signup" className="btn btn-primary btn-sm px-5 rounded-full text-sm font-bold shadow-lg shadow-primary/20">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
