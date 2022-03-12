<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    //use HasFactory;
    public $timestamp = false;
    protected $fillable = ['id','nombre','apellido','edad','sexo'];
}
