<?php

namespace App\DTO;

class UserDTO
{
    public ?int $id;
    public ?string $name;
    public ?string $cpf;
    public ?string $email;
    public ?string $password;
    public ?bool $change;

    public function __construct(array $data)
    {
        $this->id = $data['id'] ?? null;
        $this->name = $data['name'] ?? null;
        $this->cpf = $data['cpf'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->change = $data['change'] ?? null;
    }
}
