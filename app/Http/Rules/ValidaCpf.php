<?php

namespace App\Http\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidaCpf implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $cpf = preg_replace('/[^0-9]/', '', $value); // Remove caracteres especiais

        if (strlen($cpf) != 11 || preg_match('/^(\d)\1{10}$/', $cpf)) {
            $fail('O campo CPF está inválido.'); // CPF deve ter 11 dígitos
        }
        $sum = 0;
        for ($i = 1; $i <= 9; $i++) {
            $sum += (int)substr($cpf, $i - 1, 1) * (11 - $i);
        }
        $remainder = ($sum * 10) % 11;
        if ($remainder == 10 || $remainder == 11) {
            $remainder = 0;
        }
        if ($remainder != (int)substr($cpf, 9, 1)) {
            $fail('O campo CPF está inválido.'); //Primeiro dígito verificador
        }
        $sum = 0;
        for ($i = 1; $i <= 10; $i++) {
            $sum += (int)substr($cpf, $i - 1, 1) * (12 - $i);
        }
        $remainder = ($sum * 10) % 11;
        if ($remainder == 10 || $remainder == 11) {
            $remainder = 0;
        }
        if ($remainder != (int)substr($cpf, 10, 1)) {
            $fail('O campo CPF está inválido.'); // Segundo dígito verificador
        }
    }
}
