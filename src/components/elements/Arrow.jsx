import React from "react";

export function Arrow({ children, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0.5" : "1",
        userSelect: "none",
        color: "#FFD90F",
        backgroundColor: "transparent",
        border: "none",
        padding: "0px 15px",
      }}>
      {children}
    </button>
  );
}
