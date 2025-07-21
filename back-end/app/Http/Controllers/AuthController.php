<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Step 1: Validate the request inputs
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Step 2: Attempt login with credentials
        $credentials = $request->only('username', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Step 3: Get the authenticated user
        $user = Auth::user();

        // Step 4: Create API token (adjust if using Sanctum or Passport)
        $api_token = $user->createToken('api_token')->plainTextToken;

        // Step 5: Return user data and token
        return response()->json([
            'user' => $user,
            'api_token' => $api_token,
        ]);
    }
}
