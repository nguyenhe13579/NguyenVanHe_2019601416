<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\OrderDetail;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('page', 1);
        $start = ($page - 1) * $pageSize;

        $total = Order::all()->count();

        $orders = Order::query();

        if ($request->has('user_id') && $request['user_id'] !== -1)
            $orders = $orders->where('user_id', $request['user_id']);
        if ($request->has('email'))
            $orders = $orders->where('email', 'like', '%' . $request['email'] . '%');
        if ($request->has('status') && $request['status'] !== -1)
            $orders = $orders->where('status', $request['status']);

        $sort_field = $request->input('sortField', 'created_at');
        $sort_order = $request->input('sortOrder', 'desc');
        $orders = $orders->orderBy($sort_field, $sort_order);

        $orders = $orders
            ->skip($start)
            ->take($pageSize)
            ->get();

        return response()->json([
            'message' => 'Success',
            'result' => [
                'total' => $total,
                'orders' => $orders,
                'page' => $page,
                'pageSize' => $pageSize
            ]
        ]);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'full_name' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'quantity' => 'required',
            'total_price' => 'required',
            'status' => 'required'
        ]);

        $order = Order::create($request->input());

        return response()->json([
            'message' => 'Create success',
            'result' => $order
        ]);
    }

    public function latest()
    {
        $order = Order::orderby('created_at', 'desc')->first();

        return response()->json([
            'message' => 'Success',
            'result' => $order
        ]);
    }

    public function insert(Request $request)
    {
        $this->validate($request, [
            'products' => 'required|array'
        ]);

        $products = $request['products'];
        foreach ($products as $product) {
            OrderDetail::create($product);
        }

        $order = Order::orderby('created_at', 'desc')->first();
        $orderDetail = OrderDetail::query()
            ->where('order_id', $order->id)
            ->join('products', 'products.id', '=', 'order_details.product_id')
            ->get();

        Mail::send('order-success', [
            'order' => $order,
            'orderDetail' => $orderDetail
        ], function ($email) use ($order) {
            $email->to($order->email, $order->full_name);
            $email->subject('Thông tin đơn hàng từ Guitar Sao Việt');
        });

        return response()->json([
            'message' => 'Create success',
            'result' => $products
        ]);
    }

    public function show($id)
    {
        $orderDetail = OrderDetail::query()->where('order_id', $id)->get();

        return response()->json([
            'message' => 'success',
            'result' => $orderDetail
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'status' => 'required'
        ]);

        $order = Order::find($id);
        $order->fill($request->input());

        $order->save();

        return response()->json([
            'message' => 'Update success',
            'result' => $order
        ]);
    }

    public function getOrderByUser(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required'
        ]);

        $orders = Order::query()
            ->where('user_id', $request['user_id'])
            ->get();

        return response()->json([
            'message' => 'Success',
            'result' => $orders
        ]);
    }

    public function getOrderDetailByID(Request $request)
    {
        $this->validate($request, [
            'order_id' => 'required'
        ]);

        $detail = OrderDetail::query()
            ->where('order_id', $request['order_id'])
            ->join('products', 'products.id', '=', 'order_details.product_id')
            ->get();

        return response()->json([
            'message' => 'Success',
            'result' => $detail
        ]);
    }
}
