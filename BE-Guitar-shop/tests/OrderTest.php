<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Category;
use App\Models\Users;
use App\Models\Product;

class OrderTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        Users::newFactory()->count(3)->create();
        Category::newFactory()->count(3)->create();
        Product::newFactory()->count(10)->create();
        Order::newFactory()->count(10)->create();
        OrderDetail::newFactory()->count(10)->create();
    }

    public function testCreateOrder()
    {
        $response = $this->call('POST', 'order/create', [
            'full_name' => 'Huy',
            'address' => 'Ha Noi',
            'phone' => 362274026,
            'email' => 'duc4422@gmail.com',
            'quantity' => 1,
            'total_price' => 1800000,
            'status' => 1
        ]);

        $order = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->seeInDatabase('orders', ['id' => $order->result->id]);
    }

    public function testCreateOrderNoData()
    {
        $response = $this->call('POST', 'order/create', [
            'full_name' => '',
            'address' => '',
            'phone' => '',
            'email' => '',
            'quantity' => '',
            'total_price' => '',
            'status' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testGetOrders()
    {
        $ordersPageOne = json_decode(Order::all()->take(8));
        $total = Order::all()->count();

        $response = $this->call('POST', 'order', [
            'page' => 1,
            'pageSize' => 8,
            'sortField' => 'id',
            'sortOrder' => 'asc'
        ]);
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->assertEquals($total, $manage->result->total);
        $this->assertEquals($ordersPageOne, $manage->result->orders);
    }

    public function testUpdateOrder()
    {
        $order = Order::first();
        $id = $order->id;

        $response = $this->call('POST', "order/update/$id", [
            'status' => 0
        ]);
        $manage = json_decode($response->content());
        $checked = json_decode(Order::find($id));

        $this->assertEquals(200, $response->status());
        $this->assertEquals($checked, $manage->result);
    }

    public function testGetLatestOrder()
    {
        $latestOrder = json_decode(Order::orderby('created_at', 'desc')->first());

        $response = $this->call('POST', 'latest');
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->assertEquals($latestOrder, $manage->result);
    }

    public function testGetOrdersByUser()
    {
        $user = Users::first();
        $userID = $user->id;

        $orders = json_decode(Order::query()->where('user_id', $userID)->first());

        $response = $this->call('POST', 'get-order', [
            'user_id' => $userID
        ]);
        $manage = json_decode($response->content());
        // dd($orders);
        $this->assertEquals(200, $response->status());
        $this->assertEquals($orders, $manage->result[0]);
    }

    public function testGetDetailOrderByID()
    {
        $order = Order::first();
        $orderID = $order->id;

        $response = $this->call('POST', "order-detail", [
            'order_id' => $orderID
        ]);

        $this->assertEquals(200, $response->status());
    }
}
