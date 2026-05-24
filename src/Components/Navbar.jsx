import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../api/AuthService";
import { FaMagic, FaUserCircle } from "react-icons/fa";

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
            <Link to="/" className="flex items-center gap-2.5 group transition-all">
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <FaMagic className="text-primary text-lg" />
              </div>
              <span className="text-lg md:text-xl font-black tracking-tight text-white">Insta<span className="text-primary">Resume</span></span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-1">
              {[
                { label: "About", path: "/about" },
                { label: "Capabilities", path: "/services" },
                { label: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${    
                      isActive(link.path)
                        ? "text-white bg-white/10"
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
                        ? "text-white bg-white/10 shadow-lg shadow-primary/5"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Build Resume
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu (DaisyUI Dropdown) */}
          <div className="lg:hidden flex mr-2">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 rounded-2xl border border-white/5 w-52 mt-4 space-y-1">
                {[
                  { label: "Home", path: "/" },
                  { label: "About", path: "/about" },
                  { label: "Capabilities", path: "/services" },
                  { label: "Contact", path: "/contact" }
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={`rounded-xl font-medium ${isActive(link.path) ? "bg-primary/20 text-white" : "text-slate-400"}`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                {authenticated && (
                  <li>
                    <Link to="/generate-resume" className={`rounded-xl font-medium ${isActive("/generate-resume") ? "bg-primary/20 text-white" : "text-slate-400"}`}>
                      Build Resume
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="navbar-end gap-2 md:gap-3">
            {authenticated ? (
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-white/5 rounded-full border border-white/5 max-w-[120px] md:max-w-none">
                  <FaUserCircle className="text-slate-400 text-lg flex-shrink-0" />
                  <span className="text-[10px] md:text-xs font-bold text-slate-300 pr-1 truncate">{user.name}</span>  
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm text-[10px] md:text-xs font-bold text-slate-400 hover:text-error hover:bg-error/10 transition-all px-2 md:px-4"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm text-xs md:text-sm font-medium text-slate-300 px-2">Login</Link>
                <Link to="/signup" className="btn btn-primary btn-sm px-4 md:px-5 rounded-full text-xs md:text-sm font-bold shadow-lg shadow-primary/20">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
