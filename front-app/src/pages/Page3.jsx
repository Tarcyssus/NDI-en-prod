import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import DialogQuestionnaire from "../components/dialog/DialogQuestionnaire";
import '../masante.css'
import fond2 from "../assets/fond2.jpg";
import { useUser } from "../context/UserContext";
import { getConseilsPhysiques } from "../service/apiservice";

export default function Page3() {
  const [openQuestionnaire, setOpenQuestionnaire] = React.useState(false);
  const { user, setUser } = useUser();
  const [conseils, setConseils] = React.useState([]);
  const [loadingConseils, setLoadingConseils] = React.useState(false);
  const chargerConseils = async () => {
    if (!user) return;
    // Logique pour charger les conseils personnalisés en fonction du profil sportif de l'utilisateur
    console.log("Charger les conseils pour :", user);
    setLoadingConseils(true);
    try {
      const data = await getConseilsPhysiques(user);
      console.log("Conseils reçus :", data);
      setConseils(data);
    } catch (error) {
      console.error("Erreur lors du chargement des conseils :", error);
      setConseils(null);
    } finally {
      setLoadingConseils(false);
    }
  };

  React.useEffect(() => {
    chargerConseils();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const hasProfile = Boolean(user && user.sportLevel && user.sports && user.goal);

  return (
    <div className="page3-style">
      <Navbar />

      {!hasProfile ? (
        <div className='ma-sante-container'>
          <h1>Ma santé physique</h1>
          <h2>Réalisez le questionnaire pour déterminer votre profil sportif</h2>
          <button className="start-button" onClick={() => setOpenQuestionnaire(true)}>
            Questionnaire
          </button>
        </div>
      ) : conseils === null ? (
        <div className='ma-sante-container'>
          <h1>Ma santé physique</h1>
          <p>Erreur lors du chargement des conseils.</p>
        </div>
      ) : loadingConseils ? (
        <div className='ma-sante-container'>
          <h1>Ma santé physique</h1>
          <p>Chargement des conseils...</p>
        </div>
      ) : !conseils || Object.keys(conseils).length === 0 ? (
        <div className='ma-sante-container'>
          <h1>Ma santé physique</h1>
          <p>Aucun conseil disponible pour ce profil.</p>
        </div>
      ) : (
        <div className='ma-sante-container'>
          <h1>Ma santé physique</h1>
          <h2>{conseils.profil_sportif}</h2>
          <p>{conseils.conseils}</p>
          <h2>Objectif : {conseils.objectif}</h2>
          <p>{conseils.comment_y_arriver}</p>
        </div>
      )}

      {openQuestionnaire && <DialogQuestionnaire open={openQuestionnaire} onClose={() => setOpenQuestionnaire(false)} />}
    </div>
  );
}
