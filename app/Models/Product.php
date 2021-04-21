<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name','cost','count','description','user_id'];

    public function user()
    {
        $this->belongsTo(User::class);
    }
}
