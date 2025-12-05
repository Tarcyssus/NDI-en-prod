<?php

namespace App\Enum;

enum Level: string
{
    case SEDENTAIRE = 'Sédentaire';
    case FAIBLE = 'Faible';
    case MODERE = 'Modéré';
    case ELEVE = 'Élevé';
    case TRES_ELEVE = 'Très élevé';
}