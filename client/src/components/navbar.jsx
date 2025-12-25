import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/employees", label: "Employees" },
  { to: "/performance", label: "Performances" },
  { to: "/leaves", label: "Leaves" },
  { to: "/profile", label: "Profile" },
  { to: "/announcements", label: "Announcements" },
  { to: "/login", label: "Login" },
];

const Navbar = () => {
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <nav className="relative flex justify-center items-center px-8 py-4 bg-gradient-to-r from-[#f6f7f0] via-[#f6f7f0] to-[#bff4ff] shadow-md rounded-b-[25px] z-10 font-sans">
      {/* Logo */}
      <div className="absolute left-8 font-extrabold text-[1.6rem] tracking-wide" style={{ textShadow: "0 2px 6px rgba(141,190,225,0.07)" }}>
        <span className="text-[#8dbee1]">HR</span>{" "}
        <span className="text-[#377eb7]">Human Reach</span>
      </div>

      {/* Links */}
      <div className="flex gap-8 ml-[13rem]">
        {navLinks.map((link, i) => {
          const isActive = location.pathname === link.to;
          const isHover = hoverIndex === i;

          return (
            <Link
              to={link.to}
              key={link.label}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className={`
                text-[#377eb7] font-medium text-[1.05rem] px-2 py-1 rounded-t-md border-b-2 border-transparent transition-colors duration-200
                ${isActive || isHover ? "text-[#299be9] border-b-2 border-[#8dbee1] font-bold underline" : ""}
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
