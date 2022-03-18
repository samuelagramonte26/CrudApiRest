<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    //use HasFactory;
    public $timestamp = false;
    protected $fillable = ['id','nombre','apellido','edad','sexo'];

    /**
     * The attributes that are guarded from mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
    public function scopeActive($query)
    {
        $query->where('status',1);

    }
   
}
