<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;
use App\Models\Discount;

class DiscountTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        Discount::newFactory()->count(10)->create();
    }

    public function testCreateDiscount()
    {
        $response = $this->call('POST', 'discount/create', [
            'code' => 'doank14',
            'value' => 0.8,
            'status' => 1,
            'label' => 'Giảm giá 80%'
        ]);
        $newDiscount = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->seeInDatabase('discounts', ['id' => $newDiscount->result->id]);
    }

    public function testCreateNoData()
    {
        $response = $this->call('POST', 'discount/create', [
            'code' => '',
            'value' => '',
            'status' => '',
            'label' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testGetDiscounts()
    {
        $discounts = json_decode(Discount::all());
        $total = Discount::all()->count();

        $response = $this->call('POST', 'discount');
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->assertEquals($total, $manage->result->total);
        $this->assertEquals($discounts, $manage->result->discounts);
    }

    public function testGetDiscount()
    {
        $discount = json_decode(Discount::first());
        $code = $discount->code;

        $response = $this->call('POST', 'get-discount', [
            'code' => $code,
            'status' => 1
        ]);
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->assertEquals($discount, $manage->result[0]);
    }

    public function testUpdateDiscount()
    {
        $discount = Discount::first();
        $id = $discount->id;

        $response = $this->call('POST', "discount/update/$id", [
            'status' => 0
        ]);
        $manage = json_decode($response->content());
        $checked = json_decode(Discount::find($id));

        $this->assertEquals(200, $response->status());
        $this->assertEquals($checked, $manage->result);
    }

    public function testUpdateNoData()
    {
        $discount = Discount::first();
        $id = $discount->id;

        $response = $this->call('POST', "discount/update/$id", [
            'status' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }
}
