<?php

namespace App\Helper;

class GenerateCpf
{
    public function generateCpf()
    {
        $numbers = array_map(fn () => rand(0, 9), range(1, 9));

        $sum = 0;
        for ($i = 0, $weight = 10; $i < 9; $i++, $weight--) {
            $sum += $numbers[$i] * $weight;
        }
        $firstDigit = ($sum % 11 < 2) ? 0 : 11 - ($sum % 11);

        $numbers[] = $firstDigit;

        $sum = 0;
        for ($i = 0, $weight = 11; $i < 10; $i++, $weight--) {
            $sum += $numbers[$i] * $weight;
        }
        $secondDigit = ($sum % 11 < 2) ? 0 : 11 - ($sum % 11);

        $numbers[] = $secondDigit;

        return implode('', $numbers);
    }
}
