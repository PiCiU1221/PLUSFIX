<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\RatingsController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('/shows', [ShowController::class, 'index']);
Route::get('/shows/filters', [ShowController::class, 'filters']);
Route::get('/shows/{id}', [ShowController::class, 'show']);

Route::post('/shows/{id}/comments', [CommentController::class, 'store']);

Route::post('/shows/{id}/ratings', [RatingsController::class, 'store']);

Route::get('/tags/search', [TagController::class, 'search']);

Route::get('/persons/search', [PersonController::class, 'search']);

Route::prefix('moderator')->middleware('auth:sanctum')->group(function () {
    Route::get('/comments', [CommentController::class, 'index']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
});
