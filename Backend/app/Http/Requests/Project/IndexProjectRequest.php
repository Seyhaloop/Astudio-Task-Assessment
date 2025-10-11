<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class IndexProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
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
            'department' => 'sometimes|string|max:255',
            'status' => 'sometimes|in:active,inactive,completed',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',
        ];
    }

    public function messages()
    {
        return [
            'status.in' => 'Status must be active, inactive, or completed',
            'start_date.date' => 'Invalid start date format',
            'end_date.date' => 'Invalid end date format',
        ];
    }

}
