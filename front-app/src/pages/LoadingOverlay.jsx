import React from "react";
import { useLoading } from "../components/LoadingContext";
import '../index.css';

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.45)",
  backdropFilter: "blur(2px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  pointerEvents: "all", // bloque les clics derrière
};

const gifStyle = {
  width: "140px",
  height: "auto",
};

export default function LoadingOverlay({ gifPath }) {
  const { loading } = useLoading();

  if (!loading) {
    return null;
  }

  return (
      <div style={overlayStyle}>
        <img src={gifPath} alt="Loading" style={gifStyle} />
      </div>
  );
}
