<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProjectCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'total' => $this->collection->count(),
                'active_projects' => $this->collection->where('status', 'active')->count(),
                'completed_projects' => $this->collection->where('status', 'completed')->count(),
            ],
        ];
    }

    public function with($request)
    {
        return [
            'status' => 'success',
            'message' => 'Projects retrieved successfully',
        ];
    }
}
