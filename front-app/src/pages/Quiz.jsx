import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import qcmData from "../data/qcm.json";

const styles = {
    page: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "40px 20px",
        backgroundSize: "cover",
        color: "white"
    },
    card: {
        width: "100%",
        maxWidth: "600px",
        background: "rgba(255,255,255,0.2)",
        padding: "32px",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        marginTop: "20px"
    },
    title: {fontSize: "28px", fontWeight: "bold", textTransform: "capitalize", marginBottom: "20px"},
    subtitle: {fontSize: "20px", fontWeight: "600", marginBottom: "12px"},
    question: {fontSize: "18px", marginBottom: "20px"},
    button: {
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #ccc",
        background: "rgba(255,255,255,0.7)",
        textAlign: "left",
        fontSize: "16px",
        cursor: "pointer",
        transition: "0.2s",
        color: "black"
    },
    good: {background: "#22c55e", color: "white", border: "1px solid #166534"},
    bad: {background: "#ef4444", color: "white", border: "1px solid #991b1b"},
    selected: {background: "#3b82f6", color: "white", border: "1px solid #1e40af"},
    nextBtn: {
        padding: "12px 24px",
        borderRadius: "10px",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        transition: "0.2s",
        marginTop: "20px"
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 16px",
        background: "rgba(255,255,255,0.7)",
        borderRadius: "10px",
        marginBottom: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        fontWeight: 600,
    },
    container: {
        width: "600px",
        margin: "50px auto",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "18px",
        boxShadow: "0 6px 32px rgba(64,74,128,0.18)",
        padding: "40px 30px",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
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

export default function Quiz() {
    const {theme} = useParams();
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [validated, setValidated] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const user_connected = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const data = qcmData.themes[theme];
        if (data) setQuestions(data);
    }, [theme]);

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

    const validateAnswer = () => {
        setValidated(true);

        if (selected + 1 === questions[current].correct_answer) {
            setScore((s) => s + 1);
            fetch(`http://localhost:8000/api/user/${user_connected.id}/add_point`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((res) => res.json())
                .catch((err) => console.error("Erreur API leaderboard:", err));
            fetch(`http://localhost:8000/api/ranking/user/${user_connected.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch((err) => console.error("Erreur API leaderboard:", err));
        }
    };

    const nextQuestion = () => {
        if (current + 1 < questions.length) {
            setCurrent((c) => c + 1);
            setSelected(null);
            setValidated(false);
        } else {
            setFinished(true);
        }
    };

    if (!questions.length) return <div>Chargement...</div>;
    const q = questions[current];

    return (
        <>
            <Navbar/>

            <div style={styles.page}>
                {!finished ? (
                    <div style={styles.card}>
                        <h1 style={styles.title}>{theme.replace(/_/g, " ")}</h1>

                        <h2 style={styles.subtitle}>Question {current + 1} / {questions.length}</h2>

                        <p style={styles.question}>{q.question}</p>

                        <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                            {q.answers.map((a, index) => {
                                let style = styles.button;

                                // Après validation → colorier les réponses
                                if (validated) {
                                    if (index + 1 === q.correct_answer) style = {...style, ...styles.good};
                                    else if (index === selected) style = {...style, ...styles.bad};
                                } else if (selected === index) {
                                    style = {...style, ...styles.selected};
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => !validated && setSelected(index)}
                                        style={style}
                                        disabled={validated}
                                    >
                                        {a}
                                    </button>
                                );
                            })}
                        </div>

                        {!validated ? (
                            <div style={{textAlign: "right"}}>
                                <button
                                    disabled={selected === null}
                                    onClick={validateAnswer}
                                    style={{
                                        ...styles.nextBtn,
                                        background: selected === null ? "#9ca3af" : "#22c55e",
                                        cursor: selected === null ? "not-allowed" : "pointer",
                                    }}
                                >
                                    Valider
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Feedback depuis le JSON */}
                                <p style={{marginTop: "20px", fontSize: "18px", color: "white"}}>
                                    {q.feedback}
                                </p>

                                <div style={{textAlign: "right"}}>
                                    <button
                                        onClick={nextQuestion}
                                        style={{...styles.nextBtn, background: "#3b82f6", color: "white"}}
                                    >
                                        Question suivante
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div style={styles.card}>
                        <h1 style={styles.title}>Quiz terminé !</h1>

                        <p style={{fontSize: "20px", marginBottom: "20px"}}>
                            Score : {score} / {questions.length}
                        </p>

                        <button
                            onClick={() => navigate("/quiz")}
                            style={{...styles.nextBtn, background: "#3b82f6", color: "white"}}
                        >
                            Refaire un quiz
                        </button>
                    </div>
                )}
                {user.name ? (
                    <div style={styles.container}>
                        <div style={styles.row}>
                            <span style={styles.rank}>#{user.rank}</span>
                            <span style={styles.name}>{user.name}</span>
                            <span style={styles.points}>{user.points}</span>
                        </div>
                    </div>
                ) : null
                }
            </div>
        </>
    );
}
