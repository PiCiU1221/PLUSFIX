<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shows', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // Film / Serial
            $table->decimal('rating', 3, 1)->nullable();
            $table->integer('seasons')->nullable(); // Tylko dla seriali
            $table->integer('length')->nullable(); // Czas trwania w minutach
            $table->string('country')->nullable();
            $table->date('release_date')->nullable();
            $table->string('status')->nullable(); // Ongoing / Finished
            $table->decimal('popularity', 5, 2)->nullable();
            $table->text('description')->nullable();
            $table->string('languages')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shows');
    }
};

