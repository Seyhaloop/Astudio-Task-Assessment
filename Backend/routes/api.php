<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TimesheetController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
    Route::post('users/update', [UserController::class, 'update']);
    Route::post('users/delete', [UserController::class, 'destroy']);

    Route::apiResource('projects', ProjectController::class);
    Route::post('projects/update', [ProjectController::class, 'update']);
    Route::post('projects/delete', [ProjectController::class, 'destroy']);

    Route::apiResource('timesheets', TimesheetController::class);
    Route::post('timesheets/update', [TimesheetController::class, 'update']);
    Route::post('timesheets/delete', [TimesheetController::class, 'destroy']);
});
