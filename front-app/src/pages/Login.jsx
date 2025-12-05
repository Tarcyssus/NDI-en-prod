import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import { useLoading } from "../components/LoadingContext";
import '../index.css';

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    background: "#161b22", // fond sombre
    borderRadius: "18px",
    boxShadow: "0 6px 32px 0 rgba(32,34,38,0.30)",
    padding: "40px 30px",
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    color: "#e2e6ee", // texte en clair sur fond sombre
    border: "1px solid #23272f"
  },
  heading: {
    fontWeight: 700,
    color: "#fff", // titre très clair
    fontSize: "2.2rem",
    textAlign: "center",
    marginBottom: "30px",
    letterSpacing: ".5px",
    textShadow: "0 1px 6px rgba(0,0,0,0.09)",
  },
  inputGroup: {
    marginBottom: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },
  label: {
    fontSize: "1rem",
    color: "#adc7ff", // légèrement bleuté pour rester visible
    fontWeight: 500,
    letterSpacing: "0.04rem",
  },
  input: {
    padding: "12px 16px",
    fontSize: "1.03rem",
    border: "1px solid #262936",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s, background 0.15s, color 0.15s",
    background: "#222733",
    color: "#e2e6ee",
  },
  inputFocus: {
    borderColor: "#517cfd",
    background: "#232d40"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #3856b4 60%, #197c70 120%)",
    color: "#fff",
    fontWeight: 700,
    border: "none",
    borderRadius: "8px",
    fontSize: "1.13rem",
    cursor: "pointer",
    boxShadow: "0 2px 12px 0 rgba(24,77,147,0.15)",
    marginTop: "10px",
    transition: "background 0.2s, box-shadow 0.2s",
  },
  buttonHover: {
    background: "linear-gradient(90deg, #4663de 70%, #1bd9aa 120%)",
    boxShadow: "0 4px 18px rgba(81,124,253,0.23)",
  },
  message: {
    marginTop: "24px",
    fontSize: "1.03rem",
    textAlign: "center",
    fontWeight: 500,
    minHeight: "18px",
    color: "#c5e6ce"
  },
  linkText: {
    marginTop: "30px",
    textAlign: "center",
    color: "#93a4c2",
    fontSize: "1rem",
  },
  registerLink: {
    color: "#30dacb",
    fontWeight: 600,
    marginLeft: "6px",
    textDecoration: "none",
    transition: "color 0.18s",
  },
};

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [buttonHover, setButtonHover] = useState(false);
  const [inputFocus, setInputFocus] = useState({ login: false, password: false });
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-updated"));
  }, []);
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("user-updated"));
        setUser(data.user);
        setMessage(`✅ Bienvenue ${data.user.login}, connexion réussie !`);
        setTimeout(() => {
          navigate("/");
        }, 1300);
      } else {
        setMessage(`❌ Erreur : ${data.error || "Identifiants invalides"}`);
      }
    } catch (error) {
      setMessage("⚠️ Impossible de contacter le serveur");
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Connexion</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="login-input">Login</label>
            <input
              id="login-input"
              type="text"
              value={login}
              onFocus={() => setInputFocus(f => ({ ...f, login: true }))}
              onBlur={() => setInputFocus(f => ({ ...f, login: false }))}
              onChange={(e) => setLogin(e.target.value)}
              required
              style={{
                ...styles.input,
                ...(inputFocus.login ? styles.inputFocus : {})
              }}
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="username"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password-input">Mot de passe</label>
            <input
              id="password-input"
              type="password"
              value={password}
              onFocus={() => setInputFocus(f => ({ ...f, password: true }))}
              onBlur={() => setInputFocus(f => ({ ...f, password: false }))}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                ...styles.input,
                ...(inputFocus.password ? styles.inputFocus : {})
              }}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(buttonHover ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Se connecter
          </button>
        </form>
        <div style={styles.message}>{message && <span>{message}</span>}</div>
        <div style={styles.linkText}>
          Pas encore de compte ?
          <Link to="/register" style={styles.registerLink}>
            Créer un compte
          </Link>
        </div>
      </div>
    </>
  );
}
