<?php

namespace App\Repository\Interfaces;

use App\DTO\UserDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    public function getAll(string $search = null, string $field = null, string $direction = null): LengthAwarePaginator;

    public function store(UserDTO $userDTO): bool;

    public function update(UserDTO $userDTO): bool;

    public function findById(int $id);

    public function delete(int $id): bool;
}
