<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TimeSheet
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_id
 * @property string $task_name
 * @property Carbon $date
 * @property float $hours
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Project $project
 * @property User $user
 *
 * @package App\Models
 */
class TimeSheet extends Model
{
    use HasFactory;

    protected $table = 'time_sheets';

    protected $casts = [
        'user_id' => 'int',
        'project_id' => 'int',
        'date' => 'datetime',
        'hours' => 'float'
    ];

    protected $fillable = [
        'user_id',
        'project_id',
        'task_name',
        'date',
        'hours'
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
