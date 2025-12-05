import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import qcmData from "../data/qcm.json";
import {useNavigate} from "react-router-dom";

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
        backgroundSize: "cover",
        minHeight: "100vh",
    },
    title: {
        fontSize: "3rem",
        fontWeight: "700",
        color: "white",
        textAlign: "center",
        marginBottom: "10px",
    },
    subtitle: {
        fontSize: "1.3rem",
        color: "white",
        marginBottom: "40px",
    },
    buttonsContainer: {
        display: "flex",
        gap: "30px",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    button: {
        background: "rgba(255,255,255,0.85)",
        padding: "15px 35px",
        borderRadius: "12px",
        fontSize: "1.2rem",
        fontWeight: "600",
        cursor: "pointer",
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        color: "black",
    }
};

export default function QuizSelection() {
    const [themes, setThemes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupération des clés de themes
        setThemes(Object.keys(qcmData.themes));
    }, []);

    return (
        <>
            <Navbar />

            <div style={styles.wrapper}>
                <h1 style={styles.title}>Quiz</h1>
                <h2 style={styles.subtitle}>Quel quiz souhaitez-vous réaliser ?</h2>

                <div style={styles.buttonsContainer}>
                    {themes.map((theme) => (
                        <button
                            key={theme}
                            style={styles.button}
                            onClick={() => navigate(`/quiz/${theme}`)}
                        >
                            {theme.replace(/_/g, " ")}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
