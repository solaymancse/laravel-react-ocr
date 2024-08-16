<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('passport_forms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('date_of_birth');
            $table->string('place_of_birth');
            $table->integer('age');
            $table->string('address');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('nationality');
            $table->string('passport_number');
            $table->date('date_of_issue');
            $table->date('date_of_expiry');
            $table->string('place_of_issue');
            $table->string('authority');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passport_forms');
    }
};
