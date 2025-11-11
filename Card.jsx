import React from "react";

const Card = ({ title, value, icon, bgColor }) => {
  return (
    <div
      style={{
        background: bgColor,
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
      <div style={{ fontSize: "2rem" }}>{icon}</div>
    </div>
  );
};

export default Card;
