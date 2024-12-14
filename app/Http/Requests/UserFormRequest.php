<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'change' => 'nullable|boolean',
            'name' => 'required|string|min:8',
            'email' => 'required|string|email',
            'password' => 'nullable|string|min:6|confirmed|required_if:change,true',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nome é obrigatório!',
            'name.min' => 'Nome deve ter pelo menos 3 caracteres!',
            'name.string' => 'Nome precisa ser texto!',

            'email.required'    => 'E-mail é obrigatório!',
            'email.string'      => 'E-mail inválido!',
            'email.email'       => 'E-mail não tem o formato desejado!',

            'password.required_if' => 'Senha é obrigatória!',
            'password.min' => 'Senha deve ter pelo menos 6 caracteres!',
            'password.confirmed' => 'A confirmação da senha não confere!',
        ];
    }
}
