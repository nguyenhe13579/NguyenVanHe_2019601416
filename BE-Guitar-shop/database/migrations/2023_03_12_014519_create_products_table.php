<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories');
            $table->string('name');
            $table->string('image');
            $table->integer('price');
            $table->integer('amount');
            $table->string('description')->nullable();
            $table->string('bonus')->nullable();
            $table->string('origin')->nullable();
            $table->string('style')->nullable();
            $table->string('material')->nullable();
            $table->string('paint')->nullable();
            $table->string('string_name')->nullable();
            $table->integer('sold')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
