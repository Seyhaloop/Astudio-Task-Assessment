<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:active,inactive,completed',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Project name is required',
            'department.required' => 'Department is required',
            'start_date.required' => 'Start date is required',
            'end_date.after' => 'End date must be after start date',
            'status.in' => 'Status must be active, inactive, or completed',
        ];
    }
}
