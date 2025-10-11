<?php

namespace App\Http\Requests\Timesheet;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTimesheetRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|exists:time_sheets,id',
            'task_name' => 'sometimes|string|max:255',
            'date' => 'sometimes|date',
            'hours' => 'sometimes|numeric|min:0.01|max:24',
            'user_id' => 'sometimes|exists:users,id',
            'project_id' => 'sometimes|exists:projects,id',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Timesheet ID is required',
            'id.exists' => 'Timesheet not found',
            'hours.min' => 'Hours must be greater than 0',
            'hours.max' => 'Hours cannot exceed 24',
            'user_id.exists' => 'User not found',
            'project_id.exists' => 'Project not found',
        ];
    }
}
