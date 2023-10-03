import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("details");
    window.location = "/";
  };
  return (
    <nav className="navbar">
      <div style={{ flexGrow: 1, margin: "auto 20px" }}>
        <Link to="/">Home</Link>
      </div>
      <div style={{ margin: "auto 20px" }}>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
