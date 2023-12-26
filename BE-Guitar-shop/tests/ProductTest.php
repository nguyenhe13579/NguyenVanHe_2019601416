<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;

class ProductTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        Category::newFactory()->count(3)->create();
        Product::newFactory()->count(10)->create();
    }

    public function testAddProduct()
    {
        $response = $this->call('POST', 'product/create', [
            'category_id' => rand(1, 3),
            'name' => Str::random(15),
            'image' => Str::random(30),
            'price' => rand(200000, 10000000),
            'amount' => rand(10, 100),
            'description' => Str::random(15),
            'status' => rand(0, 1),
            'bonus' => Str::random(15),
            'origin' => Str::random(15),
            'style' => Str::random(15),
            'material' => Str::random(15),
            'paint' => Str::random(15),
            'brand' => Str::random(15),
            'string_name' => Str::random(15),
            'sold' => rand(0, 30)
        ]);

        $product = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->seeInDatabase('products', ['id' => $product->result->id]);
    }

    public function testAddNoData()
    {
        $response = $this->call('POST', 'product/create', [
            'category_id' => '',
            'name' => '',
            'image' => '',
            'price' => '',
            'amount' => '',
            'description' => '',
            'status' => '',
            'bonus' => '',
            'origin' => '',
            'style' => '',
            'material' => '',
            'paint' => '',
            'brand' => '',
            'string_name' => '',
            'sold' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testGetProducts()
    {
        $productsPageOne = json_decode(Product::all()->take(8));
        $total = Product::all()->count();

        foreach($productsPageOne as $product)
        {
            $product->rating_count = 0;
            $product->rating_score = null;
        }

        $response = $this->call('POST', 'product/list', [
            'page' => 1,
            'pageSize' => 8,
            'sortField' => 'products.id',
            'sortOrder' => 'asc'
        ]);
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->assertEquals($total, $manage->result->total);
        $this->assertEquals($productsPageOne, $manage->result->products);
    }

    public function testGetProduct()
    {
        $product = Product::first();
        $id = $product->id;

        $response = $this->call('POST', "product/$id");
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->seeInDatabase('products', ['id' => $manage->result->id]);
    }

    public function testUpdateProduct()
    {
        $product = Product::first();
        $id = $product->id;

        $response = $this->call('POST', "product/update/$id", [
            'category_id' => 2,
            'name' => 'updated name',
            'image' => 'updated url',
            'price' => 999999,
            'amount' => 10,
            'status' => 1
        ]);

        $manage = json_decode($response->content());
        $checked = json_decode(Product::find($id));

        $this->assertEquals(200, $response->status());
        $this->assertEquals($checked, $manage->result);
    }

    public function testUpdateNoData()
    {
        $product = Product::first();
        $id = $product->id;

        $response = $this->call('POST', "product/update/$id", [
            'category_id' => '',
            'name' => '',
            'image' => '',
            'price' => '',
            'amount' => '',
            'status' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testDeleteProduct()
    {
        $product = Product::first();
        $id = $product->id;

        $response = $this->call('DELETE', "product/$id");
        $checkDeleted = Product::find($id);

        $this->assertEquals(200, $response->status());
        $this->assertNull($checkDeleted);
    }
}
