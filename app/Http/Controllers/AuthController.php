<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthFormRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(AuthFormRequest $request): JsonResponse
    {
        try {
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->string('password'));
            $user->save();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'token' => $token,
            ]);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()]);
        }

    }

    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ],
        [
            'email.required' => 'E-mail é obrigatório!',
            'email.string' => 'E-mail inválido!',
            'email.email' => 'E-mail não tem o formato desejado!',

            'password.required' => 'Senha é obrigatória!',
            'password.string' => 'Formato de senha inválido!',
            'password.min' => 'Senha deve ter pelo menos 6 caracteres!',
        ]);

        $user = User::where('email', $data['email'])->first();

        if(!$user || !Hash::check($data['password'], $user->password)){
            return response()->json([
                'message' => 'Usuário ou senha incorretos.',
            ], 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
        ]);
    }

    public function auth(): JsonResponse
    {
        if (auth('sanctum')->check()) {
            return response()->json([
                'message' => 'Usuário autenticado!',
                'user' => auth('sanctum')->user(),
            ]);
        } else {
            return response()->json([
                'message' => 'Usuário não autenticado!',
            ], 401);
        }
    }

    public function logout(): JsonResponse
    {
        $user = User::findOrFail(auth('sanctum')->user()->id);

        $user->tokens()->delete();

        return response()->json([
            'message' => 'Usuário desconectado!',
        ]);
    }
}
