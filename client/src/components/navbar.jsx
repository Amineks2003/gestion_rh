import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import axios from "../utils/axios";
import { AppContent } from "../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { userData } = useContext(AppContent);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/employees", label: "Employees" },
    { to: "/performance", label: "Performances" },
    { to: "/leaves", label: "Leaves" },
    // 1. Announcements moved BEFORE Profile
    { to: "/announcements", label: "Announcements" },
    // 2. Profile moved to the END
    { 
      to: userData ? `/profile/${userData._id}` : "/profile", 
      label: "Profile" 
    },
  ];

  // Check if on auth page - show minimal navbar on these pages
  const isOnAuthPage = ['/login', '/email-verify', '/reset-password', '/'].includes(location.pathname);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    navigate('/login');
  };

  // Show only logo on auth pages
  if (isOnAuthPage) {
    return (
      <nav className="relative flex items-center justify-center px-4 sm:px-8 py-4 bg-gradient-to-r from-[#f6f7f0] via-[#f6f7f0] to-[#bff4ff] shadow-md rounded-b-[25px] z-10 font-sans">
        <div
          className="font-extrabold text-lg sm:text-[1.6rem] tracking-wide"
          style={{ textShadow: "0 2px 6px rgba(141,190,225,0.07)" }}
        >
          <span className="text-[#8dbee1]">HR</span>{" "}
          <span className="text-[#377eb7]">Human Reach</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="relative flex items-center justify-between px-4 sm:px-8 py-4 bg-gradient-to-r from-[#f6f7f0] via-[#f6f7f0] to-[#bff4ff] shadow-md rounded-b-[25px] z-10 font-sans">
      {/* Logo */}
      <div
        className="font-extrabold text-lg sm:text-[1.6rem] tracking-wide"
        style={{ textShadow: "0 2px 6px rgba(141,190,225,0.07)" }}
      >
        <span className="text-[#8dbee1]">HR</span>{" "}
        <span className="text-[#377eb7]">Human Reach</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex gap-6 ml-16 items-center">
        {navLinks.map((link, i) => {
          const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
          const isHover = hoverIndex === i;
          return (
            <Link
              to={link.to}
              key={link.label}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className={`
                text-[#377eb7] font-medium text-sm sm:text-[1.05rem] px-2 py-1 rounded-t-md border-b-2 border-transparent transition-colors duration-200
                ${isActive || isHover ? "text-[#299be9] border-b-2 border-[#8dbee1] font-bold underline" : ""}
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Auth / Logout Button */}
      <div className="hidden lg:flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnect</span>
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-r from-[#f6f7f0] via-[#f6f7f0] to-[#bff4ff] shadow-md flex flex-col items-center lg:hidden py-4 space-y-2 z-20 rounded-b-[25px]">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
            return (
              <Link
                to={link.to}
                key={link.label}
                onClick={() => setIsOpen(false)}
                className={`
                  text-[#377eb7] font-medium text-base px-4 py-2 rounded-md transition-colors duration-200
                  ${isActive ? "text-[#299be9] font-bold underline" : ""}
                `}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* Mobile Logout Button */}
          <button
            onClick={() => { setIsOpen(false); handleLogout(); }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Disconnect</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;