<?php

namespace App\Http\Requests\Timesheet;

use Illuminate\Foundation\Http\FormRequest;

class DeleteTimesheetRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|exists:time_sheets,id',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Timesheet ID is required',
            'id.exists' => 'Timesheet not found',
        ];
    }
}
