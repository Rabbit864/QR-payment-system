<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('sociallogin/google', [AuthController::class, 'SocialSignup']);

Route::post('generateProducts', [ProductController::class, 'generate']);

Route::get('user/{user}/products', [ProductController::class, 'index']);

Route::get('/products/{product}', [ProductController::class, 'show']);

Route::delete('/products/{product}', [ProductController::class, 'delete']);

Route::put('products/{product}', [ProductController::class, 'update']);

Route::put('basket/update', [ProductController::class, 'handlingBasket']);

