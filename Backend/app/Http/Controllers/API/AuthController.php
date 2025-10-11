<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = $this->user->create([
            'name' => $validated['name'],
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'dob' => $validated['dob'],
            'gender' => $validated['gender'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->ResponseMessage('success', 'User registered successfully', [
            'user' => new UserResource($user),
            'token' => $token,
            'token_type' => 'Bearer',
        ], 201);

    }

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = $this->user->where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return $this->ResponseMessage('error', 'The provided credentials are incorrect', 'The provided credentials are incorrect', 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->ResponseMessage('success', 'Login successful', [
            'user' => new UserResource($user),
            'token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $request->user()->currentAccessToken()->delete();


        return $this->ResponseMessage(
            'success',
            'logged out successfully',
            $user->name . " logged out successfully",
            200
        );
    }

}
