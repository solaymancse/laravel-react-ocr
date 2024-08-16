<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PassportForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date_of_birth',
        'place_of_birth',
        'age',
        'address',
        'gender',
        'nationality',
        'passport_number',
        'date_of_issue',
        'date_of_expiry',
        'place_of_issue',
        'authority',
    ];
}
