<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Helper\GenerateCpf;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(20)->create();

        $user = [
            ['name' => 'Suporte', 'email' => 'admin@teste.com', 'cpf' => (new GenerateCpf)->generateCpf(), 'email_verified_at' => now(), 'password' => Hash::make('admin123'), 'remember_token' => Str::random(10),],
        ];

        foreach ($user as $row) {
            // Verifica se o registro já existe na tabela
            if (!DB::table('users')->where('email', $row['email'])->exists()) {
                DB::table('users')->insert($row);
            }
        }
    }
}
