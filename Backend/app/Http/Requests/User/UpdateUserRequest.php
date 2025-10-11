<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|exists:users,id',
            'name' => 'sometimes|string|max:255',
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'dob' => 'sometimes|date|before:today',
            'gender' => 'sometimes|in:male,female',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $this->id,
            'password' => 'sometimes|string|min:8',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'User ID is required',
            'id.exists' => 'User not found',
            'name.required' => 'User Name is required',
            'dob.before' => 'Date of birth must be in the past',
            'gender.in' => 'Gender must be male, female, or other',
            'email.unique' => 'This email is already registered',
            'password.min' => 'Password must be at least 8 characters',
        ];
    }
}
