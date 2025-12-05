<?php

namespace App\Enum;

enum Sport: string
{
    case CARDIO = 'Cardio';
    case MUSCULATION = 'Musculation';
    case YOGA = 'Yoga';
    case SPORTS_COLLECTIFS = 'Sports collectifs';
    case AUTRES = 'Autres';
}