<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // protected $connection = "db_ppi";
    protected $table = 'task';
    protected $guarded = [];
    public $timestamps = false;

    protected $fillable = [
        'id_task',
        'namatask',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }
}
