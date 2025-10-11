<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class IndexUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules()
    {
        return [
            'name' => 'sometimes|string|max:255',
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'gender' => 'sometimes|in:male,female',
            'dob' => 'sometimes|date',
            'email' => 'sometimes|email',
        ];
    }

    public function messages()
    {
        return [
            'gender.in' => 'Gender must be male, female, or other',
            'dob.date' => 'Invalid date format',
            'email.email' => 'Invalid email format',
        ];
    }
}
