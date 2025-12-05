import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import '../index.css';

const styles = {
    container: {
        maxWidth: "600px",
        margin: "50px auto",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "18px",
        boxShadow: "0 6px 32px rgba(64,74,128,0.18)",
        padding: "40px 30px",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    heading: {
        fontWeight: 700,
        color: "white",
        fontSize: "2.5rem",
        textAlign: "center",
        marginBottom: "30px",
        letterSpacing: ".5px",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 16px",
        background: "#f0f1ff",
        borderRadius: "10px",
        marginBottom: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        fontWeight: 600,
    },
    rowUser: {
        marginTop: "25px",
        borderTop: "2px solid #ddd",
        paddingTop: "25px",
    },
    rank: {
        fontWeight: 700,
        fontSize: "1.1rem",
        color: "#2e33a8"
    },
    name: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: "1rem",
        color: "#222"
    },
    points: {
        fontWeight: 700,
        fontSize: "1rem",
        color: "#111"
    },
};

export default function Leaderboard() {
    const [players, setPlayers] = useState([]);
    const [user, setUser] = useState([]);

    const user_connected = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetch("http://localhost:8000/api/ranking", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => setPlayers(data))
            .catch((err) => console.error("Erreur API leaderboard:", err));
    }, []);

    useEffect(() => {
        if (!user_connected?.id) return;

        fetch(`http://localhost:8000/api/ranking/user/${user_connected.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error("Erreur API leaderboard:", err));
    }, [user_connected]);

    return (
        <>
            <Navbar/>
            <div>
                <h1 style={styles.heading}>Leaderboard</h1>

                <div style={styles.container}>

                    {players.length === 0 ? (
                        <p style={{textAlign: "center", color: "black"}}>
                            Chargement...
                        </p>
                    ) : (
                        players.map((player) => (
                            <div key={player.rank} style={styles.row}>
                                <span style={styles.rank}>#{player.rank}</span>
                                <span style={styles.name}>{player.name}</span>
                                <span style={styles.points}>{player.points}</span>
                            </div>
                        ))
                    )}

                    {user.name && players.length !== 0 ? (
                        <div style={styles.rowUser}>
                            <div style={styles.row}>
                                <span style={styles.rank}>#{user.rank}</span>
                                <span style={styles.name}>{user.name}</span>
                                <span style={styles.points}>{user.points}</span>
                            </div>
                        </div>
                    ) : (
                        <div style={styles.rowUser}>
                            <p style={{textAlign: "center", color: "black"}}>
                                No user connected.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
