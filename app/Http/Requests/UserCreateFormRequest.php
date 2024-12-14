<?php

namespace App\Http\Requests;

use App\Http\Rules\ValidaCpf;
use Illuminate\Foundation\Http\FormRequest;

class UserCreateFormRequest extends FormRequest
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
            'name' => 'required|string|min:3',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'cpf' => ['required', 'unique:users', new ValidaCpf],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nome é obrigatório!',
            'name.min'      => 'Nome deve ter pelo menos 3 caracteres!',
            'name.string'   => 'Nome precisa ser texto!',

            'email.required'    => 'E-mail é obrigatório!',
            'email.string'      => 'E-mail inválido!',
            'email.email'       => 'E-mail não tem o formato desejado!',
            'email.unique'      => 'E-mail já cadastrado!',

            'password.required'     => 'Senha é obrigatória!',
            'password.string'       => 'Formato de senha inválido!',
            'password.min'          => 'Senha deve ter pelo menos 6 caracteres!',
            'password.confirmed'    => 'Confirmação de senha não confere!',

            'cpf.required' => 'Cpf é obrigatório!',
            'cpf.unique' => 'Cpf já cadastrado no sistema!',
        ];
    }
}
