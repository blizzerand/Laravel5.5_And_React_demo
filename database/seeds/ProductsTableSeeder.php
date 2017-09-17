<?php

use Illuminate\Database\Seeder;

use App\Product;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {

        $faker = \Faker\Factory::create();

        // Create 50 product records
        for ($i = 0; $i < 20; $i++) {
            Product::create([
                'title' => $faker->sentence,
                'description' => $faker->paragraph,
                'price' => $faker->randomNumber(2),
                'availability' => $faker->boolean(50)
            ]);
        }
    }
}