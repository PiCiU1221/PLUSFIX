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
            $table->foreignId('type_id')->constrained('show_types');
            $table->string('title');
            $table->decimal('rating', 3, 1)->nullable();
            $table->integer('release_year')->nullable();
            $table->decimal('popularity', 5, 2)->nullable();
            $table->text('description')->nullable();
            $table->string('cover_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shows');
    }
};

