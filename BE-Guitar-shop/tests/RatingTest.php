<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;
use App\Models\Product;
use App\Models\Rating;
use App\Models\Users;
use App\Models\Category;

class RatingTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        Category::newFactory()->count(3)->create();
        Users::newFactory()->count(5)->create();
        Product::newFactory()->count(5)->create();
        Rating::newFactory()->count(10)->create();
    }

    public function testRating()
    {
        $response = $this->call('POST', 'rating/create', [
            'user_id' => 1,
            'product_id' => 1,
            'score' => 4
        ]);
        $rating = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->seeInDatabase('ratings', ['id' => $rating->result->id]);
    }

    public function testRatingNoData()
    {
        $response = $this->call('POST', 'rating/create', [
            'user_id' => '',
            'product_id' => '',
            'score' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testGetRatingScore()
    {
        $response = $this->call('POST', 'rating/score', [
            'product_id' => 1
        ]);

        $this->assertEquals(200, $response->status());
    }
}
