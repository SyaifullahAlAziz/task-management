<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\DepartemenController;
use App\Http\Controllers\AuditorController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\LokasiController;
use Maatwebsite\Excel\Facades\Excel;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// Route::middleware(['belum_login'])->group(function () {
Route::get('/', [AuthController::class, 'index'])->name('login');
Route::post('proses_login', [AuthController::class, 'proses_login'])->name('proses_login');
// });

// Route::middleware(['sudah_login'])->group(function () {

Route::get('logout', [AuthController::class, 'logout'])->name('logout');
Route::get('home', [HomeController::class, 'index'])->name('home');

// Task
Route::get('task/index', [TaskController::class, 'index'])->name('task.index');
Route::get('task/data', [TaskController::class, 'data'])->name('task.data');
Route::get('task/add', [TaskController::class, 'add'])->name('task.add');
Route::post('task/insert', [TaskController::class, 'insert'])->name('task.insert');
Route::get('task/edit/{id}', [TaskController::class, 'edit'])->name('task.edit');
Route::post('task/update', [TaskController::class, 'update'])->name('task.update');
Route::post('task/update-status/{id}', [TaskController::class, 'updateStatus']);
Route::get('task/delete/{id}', [TaskController::class, 'delete'])->name('task.delete');
// });
