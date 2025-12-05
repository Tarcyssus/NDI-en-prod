import React, { useState } from "react";
import "./DialogQuestionnaire.css";
import { modifierUser } from "../../service/apiservice";
import { useUser } from "../../context/UserContext";

export default function DialogQuestionnaire({ open, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { user, setUser } = useUser();

  // Mapping des valeurs d'énumération (les valeurs PHP, pas les noms)
  const levelValues = ["Sédentaire", "Faible", "Modéré", "Élevé", "Très élevé"];
  const sportsValues = ["Cardio", "Musculation", "Yoga", "Sports collectifs", "Autres"];
  const goalValues = ["Perte de poids", "Gain de masse", "Améliorer la santé", "Performance sportive", "Bien-être"];

  const questions = [
    {
      question: "Quel est votre niveau d'activité physique?",
      options: ["Sédentaire", "Faible", "Modéré", "Élevé", "Très élevé"]
    },
    {
      question: "Quel type d'activité préférez-vous?",
      options: ["Cardio", "Musculation", "Yoga", "Sports collectifs", "Autres"]
    },
    {
      question: "Quel est votre objectif principal?",
      options: ["Perte de poids", "Gain de masse", "Améliorer la santé", "Performance sportive", "Bien-être"]
    }
  ];

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    
    // Pour la question 1 (index 1), permettre la sélection multiple
    if (currentQuestion === 1) {
      if (!Array.isArray(newAnswers[currentQuestion])) {
        newAnswers[currentQuestion] = [];
      }
      const index = newAnswers[currentQuestion].indexOf(optionIndex);
      if (index > -1) {
        newAnswers[currentQuestion].splice(index, 1);
      } else {
        newAnswers[currentQuestion].push(optionIndex);
      }
    } else {
      newAnswers[currentQuestion] = optionIndex;
    }
    
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log("Réponses du questionnaire:", answers);
    if (user) {
      // Mapper les indices aux valeurs d'énumération (les valeurs PHP, pas les noms)
      const updatedUser = {
        ...user,
        sportLevel: levelValues[answers[0]],
        sports: Array.isArray(answers[1]) ? answers[1].map(idx => sportsValues[idx]) : null,
        goal: goalValues[answers[2]]
      };
      console.log("Données envoyées:", updatedUser);
      setUser(updatedUser);
      modifierUser(updatedUser)
        .then((response) => {
          console.log("Profil sportif mis à jour avec succès.", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour:", error.response?.data || error.message);
        });
    } else {
      console.warn("Aucun utilisateur trouvé");
    }
    onClose();
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleClose = () => {
    onClose();
    setCurrentQuestion(0);
    setAnswers([]);
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={handleClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>Questionnaire Santé Physique</h2>
          <button className="close-button" onClick={handleClose}>✕</button>
        </div>

        <div className="dialog-body">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="question-number">Question {currentQuestion + 1} sur {questions.length}</p>
          
          <h3 className="question-text">{questions[currentQuestion].question}</h3>
          
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = currentQuestion === 1
                ? Array.isArray(answers[currentQuestion]) && answers[currentQuestion].includes(index)
                : answers[currentQuestion] === index;
              
              return (
                <button
                  key={index}
                  className={`option-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="dialog-footer">
          <button 
            className="prev-button" 
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Précédent
          </button>
          <button 
            className="skip-button" 
            onClick={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                handleSubmit();
              }
            }}
          >
            Passer
          </button>
        </div>
      </div>
    </div>
  );
}
