<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class DeleteUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|exists:users,id',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'User ID is required',
            'id.exists' => 'User not found',
        ];
    }
}
