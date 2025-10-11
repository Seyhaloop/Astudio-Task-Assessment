<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Project
 *
 * @property int $id
 * @property string $name
 * @property string|null $department
 * @property Carbon|null $start_date
 * @property Carbon|null $end_date
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Collection|User[] $users
 * @property Collection|TimeSheet[] $time_sheets
 *
 * @package App\Models
 */
class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

	protected $casts = [
		'start_date' => 'datetime',
		'end_date' => 'datetime'
	];

	protected $fillable = [
		'name',
		'department',
		'start_date',
		'end_date',
		'status'
	];

	public function users()
	{
		return $this->belongsToMany(User::class, 'project_user')
					->withPivot('id')
					->withTimestamps();
	}

	public function time_sheets()
	{
		return $this->hasMany(TimeSheet::class);
	}
}
