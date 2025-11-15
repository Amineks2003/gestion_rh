import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Palette RH Manager Pro
const palette = {
  main: "#8dbee1",
  white: "#f6f7f0",
  hover: "#B1E5FF",
  dark: "#377eb7"
};

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/employees", label: "Employés" },
  { to: "/performance", label: "Performances" },
  { to: "/leaves", label: "Congés" },
  { to: "/profile", label: "Profil" },
  { to: "/announcements", label: "Annonces" },
  { to: "/login", label: "Connexion" }
];


const Navbar = () => {
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <span style={{ color: palette.main, fontWeight: "bold" }}>RH</span> <span style={{ color: palette.dark }}>Management</span>
      </div>
      <div style={styles.links}>
        {navLinks.map((link, i) => (
          <Link
            to={link.to}
            key={link.label}
            style={{
              ...styles.link,
              ...(location.pathname === link.to ? styles.linkActive : {}),
              ...(hoverIndex === i ? styles.linkHover : {})
            }}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.1rem 2rem",
    background: "linear-gradient(to right, #f6f7f0 60%, #bff4ff 100%)",
    boxShadow: "0 2px 8px rgba(141,190,225,0.10)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative", // for logo placement
    borderRadius: "0 0 25px 25px",
    zIndex: 10
  },
  logo: {
    position: "absolute",
    left: "2rem",
    fontWeight: "800",
    fontSize: "1.6rem",
    letterSpacing: "1px",
    textShadow: "0 2px 6px rgba(141,190,225,0.07)"
  },
  links: {
    display: "flex",
    gap: "2rem",
    marginLeft: "13rem" // offset for logo (responsive à ajuster si besoin)
  },
  link: {
    color: "#377eb7",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1.05rem",
    transition: "color 0.25s, border-bottom 0.2s",
    padding: "2px 6px",
    borderBottom: "2px solid transparent",
    borderRadius: "5px 5px 0 0",
  },
  linkHover: {
    color: "#299be9",
    backgroundColor: "#eaf8ff",
    borderBottom: `2px solid #8dbee1`,
  },
  linkActive: {
    color: "#299be9",
    backgroundColor: "#eaf8ff",
    borderBottom: `2px solid #8dbee1`,
    fontWeight: "bold"
  }
};

export default Navbar;
