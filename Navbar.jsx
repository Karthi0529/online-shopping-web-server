import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#1e3a8a",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>OnlineShop</h2>
      <div>
        <button
          onClick={() => navigate("/admin")}
          style={{
            marginRight: "10px",
            padding: "8px 15px",
            backgroundColor: "#3b82f6",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            fontWeight:"bold"
          }}
        >
          Admin
        </button>
        {/* ✅ Added Tickets Button */}
        <button
          onClick={() => navigate("/tickets")}
          style={{
            marginRight: "10px",
            padding: "8px 15px",
            backgroundColor: "#10b981",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            fontWeight:"bold"
          }}
        >
          Tickets
        </button>






        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            backgroundColor: "#ef4444",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            fontWeight:"bold"

          }}
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
