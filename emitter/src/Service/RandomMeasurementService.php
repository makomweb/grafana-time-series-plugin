<?php

namespace App\Service;

use DateTime;
use App\Entity\Measurement;

class RandomMeasurementService
{    
    public function createMeasurement(): Measurement
    {
        $measurement = new Measurement();        
        $measurement->setTag('my.subject.local');

        $now = new DateTime();
        $measurement->setTime($now->getTimestamp());

        $value = self::createRandomFloat(1.0, 100.0);
        $measurement->setValue($value);

        return $measurement;
    }

    private static function createRandomFloat(float $min, float $max): float
    {
        $multiplier = 1000000;
        return mt_rand($min * $multiplier, $max * $multiplier) / $multiplier;
    }
}
