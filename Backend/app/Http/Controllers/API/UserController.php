<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\DeleteUserRequest;
use App\Http\Requests\User\IndexUserRequest;
use App\Http\Requests\User\ShowUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use mysql_xdevapi\Exception;

class UserController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index(IndexUserRequest $request)
    {
        $validated = $request->validated();
        $query = User::query();

        foreach ($validated as $key => $value) {
            if ($key === 'dob') {
                $query->whereDate($key, $value);
            } else {
                $query->where($key, 'like', '%' . $value . '%');
            }
        }

        return new UserCollection(UserResource::collection($query->get()));
    }

    public function show($id)
    {
        try {
            $user = User::with(['projects', 'timesheets'])->findOrFail($id);
            return $this->ResponseMessage('success', 'User retrieved successfully', new UserResource($user), 200);
        } catch (\Exception $e) {
            return $this->ResponseMessage('error', "User with id $id not found", null, 404);

        }
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return $this->ResponseMessage('success', 'User created successfully', new UserResource($user), 201);
    }

    public function update(UpdateUserRequest $request)
    {
        $validated = $request->validated();
        $user = User::findOrFail($validated['id']);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return $this->ResponseMessage('success', 'User updated successfully', new UserResource($user->fresh()), 201);

    }

    public function destroy(DeleteUserRequest $request)
    {
        $validated = $request->validated();
        $user = User::findOrFail($validated['id']);
        $userName = $user->first_name . ' ' . $user->last_name;
        $user->delete();

        return $this->ResponseMessage('success', "User '{$userName}' deleted successfully", "$userName with ID: $user->id", 201);

    }

}
