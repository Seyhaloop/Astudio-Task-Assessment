<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TimesheetCollection extends ResourceCollection
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
                'total_hours' => $this->collection->sum('hours'),
            ],
        ];
    }

    public function with($request)
    {
        return [
            'status' => 'success',
            'message' => 'Timesheets retrieved successfully',
        ];
    }
}
