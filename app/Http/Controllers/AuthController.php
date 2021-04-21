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
            User::create([
                'name' => $user->name,
                'email'=> $user->email,
                'google_id' => $user->id
            ]);
        }
        return response()->json($user);
    }

}
