<?php

namespace App\Http\Requests\Timesheet;

use Illuminate\Foundation\Http\FormRequest;

class StoreTimesheetRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'task_name' => 'required|string|max:255',
            'date' => 'required|date',
            'hours' => 'required|numeric|min:0.01|max:24',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
        ];
    }

    public function messages()
    {
        return [
            'task_name.required' => 'Task name is required',
            'date.required' => 'Date is required',
            'hours.required' => 'Hours is required',
            'hours.min' => 'Hours must be greater than 0',
            'hours.max' => 'Hours cannot exceed 24',
            'user_id.exists' => 'User not found',
            'project_id.exists' => 'Project not found',
        ];
    }
}
