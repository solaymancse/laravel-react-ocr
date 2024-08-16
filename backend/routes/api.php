<?php

use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/upload-image', [FormController::class, 'uploadImage']);
Route::post('/submit-form', [FormController::class, 'submitForm']);
