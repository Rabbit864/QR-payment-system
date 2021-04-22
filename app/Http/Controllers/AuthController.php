<?php

namespace App\Http\Controllers;


use Socialite;
use App\Models\User;

class AuthController extends Controller
{
    public function SocialSignup()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();
        } catch (\Exception $e) {

        }

        $existingUser = User::where('email', $user->email)->first();

        if(!$existingUser){
            $existingUser = User::create([
                'name' => $user->name,
                'email'=> $user->email,
                'google_id' => $user->id
            ]);
        }

        $token = $existingUser->createToken($existingUser->email)->plainTextToken;
        return response()->json($token);
    }

}
