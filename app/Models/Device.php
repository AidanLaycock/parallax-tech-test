<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Device extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'address',
        'longitude',
        'latitude',
        'device_type',
        'manufacturer',
        'model',
        'install_date',
        'note',
        'eui',
        'serial_number',
        'import_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'install_date' => 'datetime',
    ];

    public function import(): HasOne
    {
        return $this->HasOne(Import::class, 'id', 'import_id');
    }
}
