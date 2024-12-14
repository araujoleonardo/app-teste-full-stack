<?php

namespace App\DTO;

class UserDTO
{
    public string $id;
    public string $name;
    public string $email;
    public ?string $profile_photo_path;

    public function __construct(array $data)
    {
        $this->id = $data['id'] ?? null;
        $this->name = $data['name'];
        $this->email = $data['email'];
        $this->profile_photo_path = $data['profile_photo_path'] ?? null;
    }
}
