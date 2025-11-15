import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>RH Management</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/performance" style={styles.link}>Performances</Link>
        <Link to="/leaves" style={styles.link}>Leaves</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/announcements" style={styles.link}>Announcements</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center", // centers everything horizontally
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#f9f9f9", // soft, near-white background
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logo: {
    position: "absolute", // keeps logo at the left side
    left: "2rem",
    fontWeight: "700",
    fontSize: "1.5rem",
    color: "#333",
  },
  links: {
    display: "flex",
    gap: "2rem", // spacing between links
  },
  link: {
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  linkHover: {
    color: "#007bff", // blue hover color
    borderBottom: "2px solid #007bff",
  },
};


export default Navbar;
