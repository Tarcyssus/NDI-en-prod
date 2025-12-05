<?php

namespace App\Enum;

enum Goal: string
{
    case PERTE_DE_POIDS = 'Perte de poids';
    case GAIN_DE_MASSE = 'Gain de masse';
    case AMELIORER_LA_SANTE = 'Améliorer la santé';
    case PERFORMANCE_SPORTIVE = 'Performance sportive';
    case BIEN_ETRE = 'Bien-être';
}