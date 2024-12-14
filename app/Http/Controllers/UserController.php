<?php

namespace App\Http\Controllers;

use App\DTO\UserDTO;
use App\Http\Requests\AuthFormRequest;
use App\Http\Requests\UserFormRequest;
use App\Repository\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index(Request $request): JsonResponse
    {
        $users = $this->userRepository->getAll(
            $request->search,
            $request->field,
            $request->direction
        );

        return response()->json(['users' => $users], Response::HTTP_OK);
    }

    public function show(int $id)
    {
        $user = $this->userRepository->findById($id);

        return response()->json(['user' => $user], Response::HTTP_OK);
    }

    public function store(AuthFormRequest $request): JsonResponse
    {
        $userDTO = new UserDTO($request->all());

        if ($this->userRepository->store($userDTO)) {
            return response()->json(['success' => 'Usuário criado com sucesso!'], Response::HTTP_CREATED);
        }

        return response()->json(['error' => 'Falha ao criar usuário!'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function update(UserFormRequest $request): JsonResponse
    {
        $userDTO = new UserDTO($request->all());
        $userDTO->id = $request->id;

        if ($this->userRepository->update($userDTO)) {
            return response()->json(['success' => 'Usuário atualizado com sucesso!'], Response::HTTP_OK);
        }

        return response()->json(['error' => 'Falha ao atualizar usuário!'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function destroy(int $id): JsonResponse
    {
        if($this->userRepository->delete($id)) {
            return response()->json(['success' => 'Usuário excluído com sucesso!'], Response::HTTP_OK);
        }

        return response()->json(['error' => 'Não foi possível excluir!'], Response::HTTP_NOT_FOUND);
    }
}
