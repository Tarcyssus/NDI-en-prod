import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLoading } from "../components/LoadingContext";
import fond1 from "../assets/fond1.jpg";
import '../index.css';

const cardStyles = {
  page: {
    minHeight: "100vh",
    background: `#0b0f1a url(${fond1}) center/cover no-repeat`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "180px",
    boxSizing: "border-box",
  },
  card: {
    background: "rgba(235,235,235,0.92)",
    borderRadius: "18px",
    padding: "34px 44px",
    width: "min(90vw, 520px)",
    boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
    border: "1px solid rgba(0,0,0,0.08)",
    textAlign: "center",
    fontFamily: "'Times New Roman', Georgia, serif",
    color: "#111",
  },
  title: {
    fontSize: "2.1rem",
    marginBottom: "18px",
    letterSpacing: "0.04em",
  },
  label: {
    fontSize: "1.15rem",
    margin: "12px 0 6px",
  },
  text: {
    fontSize: "1.1rem",
    marginBottom: "10px",
  },
  badgeRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  badge: {
    padding: "8px 14px",
    background: "#b0b0b0",
    borderRadius: "8px",
    minWidth: "90px",
    fontWeight: 600,
  },
  button: {
    marginTop: "16px",
    padding: "10px 18px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: "0.03em",
    boxShadow: "0 6px 20px rgba(13,110,253,0.35)",
  },
  muted: {
    color: "#555",
    fontSize: "1rem",
  },
};

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    return null;
  }
};

export default function Profile() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(readUser);

  useEffect(() => {
    const sync = () => setCurrentUser(readUser());
    window.addEventListener("storage", sync);
    window.addEventListener("user-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("user-updated", sync);
    };
  }, []);

  useEffect(() => {
    if (!currentUser?.id) {
      navigate("/login");
      return;
    }

    const controller = new AbortController();

    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      setProfile(null);
      showLoading();
      try {
        const res = await fetch(`http://localhost:8000/api/profile/${currentUser.id}`, {
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Impossible de charger le profil.");
        }
      } finally {
        setLoading(false);
        hideLoading();
      }
    };

    fetchProfile();
    return () => controller.abort();
  }, [navigate, currentUser?.id, showLoading, hideLoading]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-updated"));
    navigate("/login");
  };

  return (
    <div style={cardStyles.page}>
      <Navbar />
      <div style={cardStyles.card}>
        {loading && <p style={cardStyles.text}>Chargement du profil...</p>}
        {error && (
          <>
            <p style={cardStyles.text}>{error}</p>
            <button type="button" style={cardStyles.button} onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        )}
        {!loading && !error && profile && (
          <>
            <h2 style={cardStyles.title}>{profile.name}</h2>
            <p style={cardStyles.text}>Niveau sportif : {profile.sportLevel ?? "Non défini"}</p>
            <p style={cardStyles.label}>Sport pratiqués :</p>
            <div style={cardStyles.badgeRow}>
              {Array.isArray(profile.sports) && profile.sports.length > 0 ? (
                profile.sports.map((sport) => (
                  <span key={sport} style={cardStyles.badge}>{sport}</span>
                ))
              ) : (
                <span style={cardStyles.muted}>Aucun sport renseigné</span>
              )}
            </div>
            <p style={cardStyles.text}>Objectif : {profile.goal ?? "Non renseigné"}</p>
            <p style={cardStyles.text}>Rank : {profile.rank ?? "?"}</p>
            <p style={cardStyles.text}>Points : {profile.points ?? "-"}</p>
            <button type="button" style={cardStyles.button} onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        )}
      </div>
    </div>
  );
}
