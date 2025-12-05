<?php

namespace App\Controller;

use App\Entity\User;
use App\Enum\Goal;
use App\Enum\Level;
use App\Enum\Sport;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class SantePhysiqueController extends AbstractController
{
    #[Route('/api/users/{id}/sante_physique', name: 'sante_physique', methods: ['GET'])]
    public function getRemarquesSantePhysique(int $id, UserRepository $userRepository): JsonResponse
    {
        // 1. Récupération de l'utilisateur
        $user = $userRepository->find($id);

        if (!$user) {
            return $this->json(['error' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // 2. Extraction des données
        $level = $user->getSportLevel();
        $sports = $user->getSports() ?? []; // Tableau vide si null
        $goal = $user->getGoal();

        // 3. Génération du contenu intelligent
        $profil = $this->generateProfil($level, $sports);
        $conseils = $this->generateConseils($level, $sports);
        $planAction = $this->generatePlanAction($goal, $level);

        // Texte brut de l'objectif pour l'affichage
        $objectifLabel = $goal ? $goal->value : 'Non défini';

        // 4. Construction de la réponse JSON
        return $this->json([
            'profil_sportif' => $profil,
            'conseils' => $conseils,
            'objectif' => $objectifLabel,
            'comment_y_arriver' => $planAction,
            'autre' => "Rappelle-toi : La motivation te fait commencer, l'habitude te fait continuer !",
            // On renvoie aussi les valeurs brutes au cas où le front en a besoin pour des icônes/logiques
            'meta' => [
                'level_raw' => $level?->value,
                'goal_raw' => $goal?->value,
                'nb_sports' => count($sports)
            ]
        ]);
    }

    /**
     * Génère une description textuelle du profil
     */
    private function generateProfil(?Level $level, array $sports): string
    {
        if (!$level) {
            return "Profil incomplet. Réponds au questionnaire pour en savoir plus !";
        }

        $desc = match ($level) {
            Level::SEDENTAIRE => "Tu es au début de ton aventure. Tout est à construire, et c'est excitant !",
            Level::FAIBLE => "Tu es un sportif occasionnel. Tu as les bases, il faut maintenant ancrer l'habitude.",
            Level::MODERE => "Tu as un profil actif et équilibré. Le sport fait partie de ta vie.",
            Level::ELEVE => "Tu es un athlète confirmé. Ton corps est ton outil de travail.",
            Level::TRES_ELEVE => "Tu es une machine de guerre ! Un niveau d'élite qui demande une rigueur exemplaire.",
        };

        if (!empty($sports)) {
            $sportNames = array_map(fn(Sport $s) => $s->value, $sports);
            $sportList = implode(', ', $sportNames);
            $desc .= " Tu es polyvalent avec une pratique orientée vers : $sportList.";
        }

        return $desc;
    }

    /**
     * Génère une liste de conseils pratiques
     */
    private function generateConseils(?Level $level, array $sports): array
    {
        $conseils = [];

        // Conseil général basé sur le niveau
        $conseils[] = match ($level) {
            Level::SEDENTAIRE => "Commence petit : 20 minutes de marche active par jour suffisent pour réveiller ton métabolisme.",
            Level::FAIBLE => "Essaie de fixer des jours précis pour tes séances (ex: Mardi et Jeudi) pour créer une routine.",
            Level::MODERE => "Varie l'intensité de tes entraînements pour éviter la stagnation.",
            Level::ELEVE, Level::TRES_ELEVE => "N'oublie jamais la récupération (sommeil, hydratation). C'est là que tu progresses.",
            default => "Hydrate-toi bien, c'est la base de tout effort."
        };

        // Conseils spécifiques aux sports pratiqués
        foreach ($sports as $sport) {
            switch ($sport) {
                case Sport::MUSCULATION:
                    $conseils[] = "Focus sur la technique avant la charge. Le contrôle du mouvement prévient les blessures.";
                    break;
                case Sport::CARDIO:
                    $conseils[] = "Pour améliorer ton cardio, intègre une séance de fractionné (HIIT) par semaine.";
                    break;
                case Sport::YOGA:
                    $conseils[] = "La respiration est la clé. Ne force jamais une posture si tu bloques ta respiration.";
                    break;
                case Sport::SPORTS_COLLECTIFS:
                    $conseils[] = "Travaille ton explosivité et tes changements de direction pour être plus performant en match.";
                    break;
            }
        }

        return $conseils;
    }

    /**
     * Génère le plan d'action ("Comment y arriver")
     */
    private function generatePlanAction(?Goal $goal, ?Level $level): string
    {
        if (!$goal) {
            return "Sélectionne un objectif pour obtenir ton plan de bataille.";
        }

        return match ($goal) {
            Goal::PERTE_DE_POIDS => "La clé est le déficit calorique léger combiné à l'activité. Vise 3 séances mixant cardio (pour brûler) et renforcement (pour augmenter ton métabolisme de base).",
            Goal::GAIN_DE_MASSE => "Il faut manger plus que tu ne dépenses (surplus calorique sain) et privilégier l'hypertrophie (séries de 8-12 réps proches de l'échec) avec beaucoup de protéines.",
            Goal::AMELIORER_LA_SANTE => "Vise la régularité plutôt que l'intensité. 30 minutes d'activité modérée par jour, une alimentation riche en végétaux et un sommeil de qualité.",
            Goal::PERFORMANCE_SPORTIVE => "Tu as besoin d'un programme structuré avec des cycles de force, d'endurance et de repos. Note tes performances à chaque séance pour suivre ta progression.",
            Goal::BIEN_ETRE => "Écoute ton corps. Alterne entre activités douces (yoga, marche) et séances plus dynamiques selon ton énergie du jour. Le but est de te sentir bien, pas de te détruire.",
        };
    }
}