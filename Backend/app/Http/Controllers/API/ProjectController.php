<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\DeleteProjectRequest;
use App\Http\Requests\Project\IndexProjectRequest;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\TimeSheet;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    public function index(IndexProjectRequest $request)
    {
        $validated = $request->validated();
        $query = $this->project->query();

        foreach ($validated as $key => $value) {
            if (in_array($key, ['start_date', 'end_date'])) {
                $query->whereDate($key, $value);
            } else {
                $query->where($key, 'like', '%' . $value . '%');
            }
        }

        return new ProjectCollection(ProjectResource::collection($query->get()));
    }

    public function show($id)
    {
        try {
            $project = $this->project->with(['users', 'time_sheets'])->findOrFail($id);
            return $this->ResponseMessage('success', 'Project retrieved successfully', new ProjectResource($project), 201);
        } catch (\Exception $e) {
            return $this->ResponseMessage('error', "Project with id $id not found", null, 404);

        }

    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();
        $project = $this->project->create($validated);
        $project->users()->attach(auth()->id());
        return $this->ResponseMessage('success', 'Project created successfully', new ProjectResource($project), 201);
    }

    public function update(UpdateProjectRequest $request)
    {
        $validated = $request->validated();
        $project = $this->project->findOrFail($validated['id']);
        $project->update($validated);
        return $this->ResponseMessage('success', 'Project updated successfully', new ProjectResource($project->fresh()), 201);
    }

    public function destroy(DeleteProjectRequest $request)
    {
        $validated = $request->validated();
        $project = $this->project->findOrFail($validated['id']);
        $projectName = $project->name;
        $project->delete();
        return $this->ResponseMessage('success', "Project '{$projectName}' deleted successfully", "$project with ID: $project->id", 201);
    }
}
