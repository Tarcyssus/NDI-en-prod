import React from "react";
import Navbar from "../components/Navbar";
import { useLoading } from "../components/LoadingContext";
import NIRDLogo from "../assets/NIRD_logo.png";
import '../index.css';

export default function Home() {
    const { showLoading, hideLoading } = useLoading();

    const doFakeRequest = async () => {
        showLoading();
        await new Promise(res => setTimeout(res, 4000));
        hideLoading();
    };

    return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "6rem",
            fontWeight: 900,
            color: "#fff",
            textShadow: "0 5px 24px rgba(44,54,110,0.23), 0 0 0 #fff",
            letterSpacing: "0.17em",
            textAlign: "center",
            margin: 0,
          }}
        >
          <strong>NIRD</strong>
        </h1>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 500,
            color: "#fff",
            textShadow: "0 2px 12px rgba(44,54,110,0.20)",
            marginTop: "28px",
            textAlign: "center",
            letterSpacing: "0.05em"
          }}
        >
          Le règne des GAFAM prend fin en ce jour...
        </h2>
      </div>
      <div
        style={{
          minHeight: "20vh",
          background: "black",
          borderTopLeftRadius: "500px",
          borderTopRightRadius: "500px",
          marginTop: "30vh",
        }}
      ></div>
      <div
        style={{
          minHeight: "200vh",
          background: "black",
          marginTop: "0px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "10vw",
            width: "35vw",
            zIndex: 900,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              fontSize: "2.25rem", // Augmente la taille de police
              lineHeight: "1.65",
              fontWeight: 400,
            }}
          >
          À l’heure où les établissements scolaires dépendent toujours davantage des géants du numérique, une question devient urgente : comment garder la maîtrise de nos outils, de nos données et de nos choix ? Fin de support de logiciels propriétaires, matériel rendu obsolète alors qu’il fonctionne encore, abonnements coûteux, stockage hors UE… Le système éducatif se retrouve face à un véritable Goliath technologique.<br></br>

Mais comme dans toute bonne histoire, il existe un village irréductible : celui des communautés éducatives qui souhaitent reprendre le pouvoir sur leur numérique. C’est cette aventure qu’incarne la démarche NIRD – Numérique Inclusif, Responsable et Durable. Elle propose aux écoles, collèges, lycées et collectivités un chemin progressif, réaliste et motivant pour réduire leurs dépendances aux Big Tech et retrouver une véritable autonomie technologique.<br></br>

Ici, vous entrez dans un espace conçu pour comprendre, jouer, explorer et agir. Notre plateforme vous guide pas à pas pour découvrir des alternatives libres et durables, comprendre les enjeux d’un numérique respectueux, et accompagner les équipes éducatives vers des solutions ouvertes, maîtrisables et pérennes.

          </p>
        </div>
        <img
          src={NIRDLogo}
          alt="NIRD Logo"
          style={{
            position: "absolute",
            top: "40px",
            right: "10vw",
            width: "35vw",
            height: "auto",
            zIndex: 900,
            borderRadius: "18px",
            padding: "12px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "calc(120px + 35vw + 24px)", // position sous le logo en tenant compte du padding
            right: "10vw",
            width: "35vw",
            zIndex: 900,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              fontSize: "2.25rem",
              lineHeight: "1.5",
              fontWeight: 400,
              marginTop: "8px"
            }}
          >
            À travers des défis ludiques, des scénarios interactifs, des ressources contributives et une communauté active, vous apprendrez comment transformer un établissement en véritable Village Numérique Résistant : plus robuste, plus souverain et plus créatif.

            En rejoignant cette aventure, vous devenez vous aussi un artisan de la résistance numérique : un défenseur des usages responsables, un bâtisseur de solutions durables, un éclaireur pour les générations futures. Ensemble, montrons qu’un autre numérique est possible, souhaitable… et enthousiasmant !
            <br></br>
            <br></br>
            <strong>
            Entrez, jouez, découvrez, contribuez.
            Le Village Numérique Résistant n’attend plus que vous.
            </strong>
          </p>
        </div>
      </div>
    </>
  );
} 
