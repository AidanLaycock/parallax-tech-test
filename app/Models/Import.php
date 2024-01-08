<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Import extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
       'filename',
       'user_id',
       'started_at',
       'completed_at'
    ];

    public function Devices(): HasMany 
    {
        return $this->HasMany(Device::class, 'import_id', 'id');
    }
}
