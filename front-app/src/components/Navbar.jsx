import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserCircle } from "react-icons/fa";

// On utilise une balise <style> pour injecter du CSS pour l'animation moderne de survol
export default function Navbar() {
  const readUserFromStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      return null;
    }
  };

  const [user, setUser] = useState(readUserFromStorage);

  useEffect(() => {
    const syncUser = () => setUser(readUserFromStorage());
    window.addEventListener("storage", syncUser);
    window.addEventListener("user-updated", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("user-updated", syncUser);
    };
  }, []);

  return (
    <>
      <style>
        {`
          .navbar-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #111;
            text-decoration: none !important;
            font-size: 1.5rem; /* Augmenté depuis 1.1rem */
            font-weight: 500;
            padding: 6px 12px;
            border-radius: 6px;
            background: none;
            position: relative;
            transition: color 0.22s cubic-bezier(0.4,0,0.2,1);
            overflow: visible;
          }
          .navbar-link:visited {
            text-decoration: none !important;
          }
          .navbar-link:focus {
            outline: none;
          }
          .navbar-link .underline-anim {
            position: absolute;
            left: 0;
            bottom: 3px;
            width: 100%;
            height: 2.5px;
            background: linear-gradient(90deg,#38bdf8 0%,#6366f1 100%);
            border-radius: 3px;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
            pointer-events: none;
            content: "";
          }
          .navbar-link:hover,
          .navbar-link:focus-visible {
            text-decoration: none !important;
          }
          .navbar-link:hover .underline-anim,
          .navbar-link:focus-visible .underline-anim {
            transform: scaleX(1);
          }
        `}
      </style>
      <div style={{ height: "120px", position: "relative" }}>
        <nav style={styles.nav}>
          <div style={styles.content}>
            <div style={styles.left}>
              <h2 style={styles.logo}>NDI2025</h2>
              <ul style={styles.links}>
                <li>
                  <Link to="/" className="navbar-link" style={styles.link}>
                    <FaHome style={styles.icon} /> Home
                    <span className="underline-anim" />
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="navbar-link" style={styles.link}>
                    Quiz
                    <span className="underline-anim" />
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="navbar-link" style={styles.link}>
                    Leaderboard
                    <span className="underline-anim" />
                  </Link>
                </li>
                <li>
                  <Link to="/page3" className="navbar-link" style={styles.link}>
                    Ma santé
                    <span className="underline-anim" />
                  </Link>
                </li>
              </ul>
            </div>
            <div style={{ ...styles.right, marginRight: "64px" }}>
              {user ? (
                <Link to="/profile" className="navbar-link" style={styles.link}>
                  <FaUserCircle style={styles.icon} /> {user.login}
                  <span className="underline-anim" />
                </Link>
              ) : (
                <Link to="/login" className="navbar-link" style={styles.link}>
                  <FaSignInAlt style={styles.icon} /> Login
                  <span className="underline-anim" />
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: "28px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 999,
    background: "rgba(255,255,255,0.6)", // blanc transparent
    backdropFilter: "blur(12px)",
    borderRadius: "32px", // Arandisse plus le bord
    boxShadow: "0 6px 36px 0 rgba(44,54,110,0.25)",
    minWidth: "fit-content",
    maxWidth: "95vw",
    width: "80%",
    padding: 0,
    color: "#111", // Changer le texte en noir
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 34px",
    width: "100%",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  links: {
    listStyle: "none",
    display: "flex",
    gap: "24px",
    margin: 0,
    padding: 0,
  },
  link: {
    // Les propriétés de base, les animations sont gérées par la classe CSS
    background: "none",
    position: "relative",
    zIndex: 1,
  },
  icon: {
    fontSize: "1.2rem",
    color: "#111", // Icônes en noir aussi
  },
  logo: {
    margin: 0,
    fontSize: "1.6rem",
    fontWeight: "700",
    fontFamily: "'Pacifico', cursive",
    background: "linear-gradient(90deg,#38bdf8 0%,#6366f1 60%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
};
