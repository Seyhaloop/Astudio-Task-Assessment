<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SheetsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Identifier' => $this->id,
            'TaskName' => $this->task_name,
            'Date' => $this->date->format('Y-m-d'),
            'DayName' => $this->date->format('l'),
            'HoursParse' => (float)$this->hours,
            'HourFormatted' => $this->hours . ' hrs',
            'Users' => new UserResource($this->whenLoaded('user')),
            'userId' => $this->user_id,
            'UserName' => $this->whenLoaded('user', function () {
                return $this->user->first_name . ' ' . $this->user->last_name;
            }),
            'Project' => new ProjectResource($this->whenLoaded('project')),
            'ProjectId' => $this->project_id,
            'ProjectName' => $this->whenLoaded('project', function () {
                return $this->project->name;
            }),
            'CreatedIn' => $this->created_at->format('Y-m-d H:i:s'),
            'UpdatedIn' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
