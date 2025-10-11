<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'Name' => $this->name,
            'Department' => $this->department,
            'StartIn' => $this->start_date->format('Y-m-d'),
            'EndIn' => $this->end_date->format('Y-m-d'),
            'Duration' => $this->start_date->diffInDays($this->end_date),
            'Status' => $this->status,
            'Label' => ucfirst($this->status),
            'Active' => $this->status === 'active',
            'Users' => UserResource::collection($this->whenLoaded('users')),
            'Sheets' => SheetsResource::collection($this->whenLoaded('time_sheets')),
            'TotalHours' => $this->whenLoaded('time_sheets', function () {
                return $this->time_sheets->sum('hours');
            }),
            'CreatedIn' => $this->created_at->format('Y-m-d H:i:s'),
            'UpdatedIn' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
