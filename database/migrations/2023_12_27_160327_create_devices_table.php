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
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->longText('address');
            $table->double('longitude', 9, 6);
            $table->double('latitude', 8, 6);
            $table->text('device_type');
            $table->text('manufacturer');
            $table->text('model');
            $table->dateTime('install_date');
            $table->longText('note');
            $table->string('eui');
            $table->string('serial_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
