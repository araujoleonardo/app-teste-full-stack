<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',    [AuthController::class, 'register'])->name('register');
Route::post('/login',       [AuthController::class, 'login'])->name('login');
Route::get('/auth',         [AuthController::class, 'auth'])->name('auth');
Route::post('/logout',      [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users',                 [UserController::class, 'index'])->name('user.list');
    Route::get('/user/{id}',             [UserController::class, 'show'])->name('user.show');
    Route::post('/user-create',          [UserController::class, 'store'])->name('user.create');
    Route::post('/user-update',          [UserController::class, 'update'])->name('user.update');
    Route::delete('/user-delete/{id}',   [UserController::class, 'destroy'])->name('user.delete');
});
