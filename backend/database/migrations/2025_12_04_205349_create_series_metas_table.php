<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('series_metas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('show_id')->constrained('shows')->onDelete('cascade');
            $table->boolean('is_running')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('series_metas');
    }
};
