<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Timesheet\DeleteTimesheetRequest;
use App\Http\Requests\Timesheet\IndexTimesheetRequest;
use App\Http\Requests\Timesheet\StoreTimesheetRequest;
use App\Http\Requests\Timesheet\UpdateTimesheetRequest;
use App\Http\Resources\SheetsResource;
use App\Http\Resources\TimesheetCollection;
use App\Models\TimeSheet;
use App\Models\User;
use Illuminate\Http\Request;

class TimesheetController extends Controller
{
    public function __construct(Timesheet $sheet)
    {
        $this->sheet = $sheet;
    }

    public function index(IndexTimesheetRequest $request)
    {
        $validated = $request->validated();
        $query = $this->sheet->query();

        foreach ($validated as $key => $value) {
            if ($key === 'date') {
                $query->whereDate($key, $value);
            } elseif (in_array($key, ['user_id', 'project_id', 'hours'])) {
                $query->where($key, $value);
            } else {
                $query->where($key, 'like', '%' . $value . '%');
            }
        }

        $timesheets = $query->with(['user', 'project'])->get();

        return new TimesheetCollection(SheetsResource::collection($timesheets));
    }

    public function show($id)
    {
        try {
            $timesheet = $this->sheet->with(['user', 'project'])->findOrFail($id);
            return $this->ResponseMessage('success', 'Time sheet retrieved successfully', new SheetsResource($timesheet), 201);
        } catch (\Exception $e) {
            return $this->ResponseMessage('error', "Time sheet with id $id not found", null, 404);

        }

    }

    public function store(StoreTimesheetRequest $request)
    {
        $validated = $request->validated();
        $timesheet = $this->sheet->create($validated);

        return $this->ResponseMessage('success', 'Time sheet created successfully', new SheetsResource($timesheet->load(['user', 'project'])), 201);
    }

    public function update(UpdateTimesheetRequest $request)
    {
        $validated = $request->validated();
        $timesheet = $this->sheet->findOrFail($validated['id']);
        $timesheet->update($validated);
        return $this->ResponseMessage('success', 'Time sheet updated successfully', new SheetsResource($timesheet->fresh()->load(['user', 'project'])), 201);
    }

    public function destroy(DeleteTimesheetRequest $request)
    {
        $validated = $request->validated();
        $timesheet = $this->sheet->findOrFail($validated['id']);
        $taskName = $timesheet->task_name;
        $timesheet->delete();
        return $this->ResponseMessage('success', "Time sheet '{$taskName}' deleted successfully", "Time sheet '{$taskName}' With ID:  '{$timesheet->id}'", 201);
    }
}
