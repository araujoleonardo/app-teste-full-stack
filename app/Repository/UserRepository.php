<?php

namespace App\Repository;

use App\DTO\UserDTO;
use App\Repository\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserRepository implements UserRepositoryInterface
{

    public function getAll(string $search = null, string $field = null, string $direction = null): LengthAwarePaginator
    {
        $query = User::whereNot('id', auth()->id());

        if ($search) {
            $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('email', 'LIKE', '%' . $search . '%')
                ->orWhere('cpf', 'LIKE', '%' . $search . '%');
        }

        if ($field && $direction) {
            $query->orderBy($field, $direction);
        }

        return $query->paginate(10);
    }

    public function findById(int $id)
    {
        return User::findOrFail($id);
    }

    public function store(UserDTO $userDTO): bool
    {
        try {
            $user = new User();
            $user->name = $userDTO->name;
            $user->email = $userDTO->email;
            $user->cpf = preg_replace('/[^0-9]/', '', $userDTO->cpf);
            $user->password = Hash::make($userDTO->password);
            $user->save();

            return true;
        }catch (\Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function update(UserDTO $userDTO): bool
    {
        try {
            $user = User::findOrFail($userDTO->id);

            $user->name = $userDTO->name;
            $user->email = $userDTO->email;
            if (!empty($userDTO->password)) {
                $user->password = Hash::make($userDTO->password);
            }
            if (!empty($userDTO->cpf)) {
                $user->cpf = preg_replace('/[^0-9]/', '', $userDTO->cpf);
            }
            $user->update();

            return true;
        }catch (\Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function delete(int $id): bool
    {
        try{
            $user = User::findOrFail($id);
            return $user->delete();
        }catch (\Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }
}
