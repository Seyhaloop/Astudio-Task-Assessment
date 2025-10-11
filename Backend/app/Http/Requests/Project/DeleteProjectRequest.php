<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class DeleteProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|exists:projects,id',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Project ID is required',
            'id.exists' => 'Project not found',
        ];
    }
}
