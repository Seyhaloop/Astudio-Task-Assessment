<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'FirstName' => $this->first_name,
            'LastName' => $this->last_name,
            'FullName' => $this->first_name . ' ' . $this->last_name,
            'UserName' => $this->name,
            'BirthDate' => $this->dob ? \Carbon\Carbon::parse($this->dob)->format('Y-m-d') : null,
            'Age' => optional($this->dob)->age,
            'Gender' => $this->gender,
            'Email' => $this->email,
            'Projects' => ProjectResource::collection($this->whenLoaded('projects')),
            'Sheets' => SheetsResource::collection($this->whenLoaded('timesheets')),
            'CreatedIn' => $this->created_at->format('Y-m-d H:i:s'),
            'UpdatedIn' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
