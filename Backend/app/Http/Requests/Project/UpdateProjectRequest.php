<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|exists:projects,id',
            'name' => 'sometimes|string|max:255',
            'department' => 'sometimes|string|max:255',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'status' => 'sometimes|in:active,inactive,completed',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Project ID is required',
            'id.exists' => 'Project not found',
            'end_date.after' => 'End date must be after start date',
            'status.in' => 'Status must be active, inactive, or completed',
        ];
    }
}
