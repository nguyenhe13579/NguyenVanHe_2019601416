<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;
use App\Models\Category;

class CategoryTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        Category::newFactory()->count(10)->create();
    }

    public function testAddCategory()
    {
        $response = $this->call('POST', 'category/create', [
            'name' => 'Category 1',
            'description' => 'Description test',
            'status' => 1
        ]);
        $category = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->seeInDatabase('categories', ['id' => $category->result->id]);
    }

    public function testAddNoData()
    {
        $response = $this->call('POST', 'category/create', [
            'name' => '',
            'description' => '',
            'status' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testGetCategories()
    {
        $categories = json_decode(Category::all());
        $total = Category::all()->count();

        foreach ($categories as $category) {
            $category->product_count = 0;
        }

        $response = $this->call('POST', 'category/list');
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->assertEquals($total, $manage->result->total);
        $this->assertEquals($categories, $manage->result->categories);
    }

    public function testGetCategory()
    {
        $category = Category::first();
        $id = $category->id;

        $response = $this->call('POST', "category/$id");
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->seeInDatabase('categories', ['id' => $manage->result->id]);
    }

    public function testUpdateCategory()
    {
        $category = Category::first();
        $id = $category->id;

        $response = $this->call('POST', "category/update/$id", [
            'name' => 'updated name',
            'description' => 'updated description',
            'status' => 1
        ]);
        $manage = json_decode($response->content());
        $check = json_decode(Category::find($id));

        $this->assertEquals(200, $response->status());
        $this->assertEquals($check, $manage->result);
    }

    public function testUpdateNoData()
    {
        $category = Category::first();
        $id = $category->id;

        $response = $this->call('POST', "category/update/$id", [
            'name' => '',
            'description' => '',
            'status' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testDeleteCategory()
    {
        $category = Category::first();
        $id = $category->id;

        $response = $this->call('DELETE', "category/$id");
        $checkDeleted = Category::find($id);

        $this->assertEquals(200, $response->status());
        $this->assertNull($checkDeleted);
    }
}
