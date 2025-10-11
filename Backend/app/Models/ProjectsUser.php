<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProjectsUser
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Project $project
 * @property User $user
 *
 * @package App\Models
 */
class ProjectsUser extends Model
{
    use HasFactory;

    protected $table = 'project_user';

    protected $casts = [
        'user_id' => 'int',
        'project_id' => 'int'
    ];

    protected $fillable = [
        'user_id',
        'project_id'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
