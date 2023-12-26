<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;

class DiscountController extends Controller
{
    public function index()
    {
        $total = Discount::all()->count();
        $discounts = Discount::all();

        return response()->json([
            'message' => 'Success',
            'result' => [
                'total' => $total,
                'discounts' => $discounts
            ]
        ]);
    }

    public function checkDiscount(Request $request) {
        $discount = Discount::query()->where([
            'code' => $request['code'],
            'status' => $request['status']
        ])->get();

        return response()->json([
            'message' => 'Success',
            'result' => $discount
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'code' => 'required',
            'value' => 'required'
        ]);

        $discounts = Discount::create($request->input());

        return response()->json([
            'message' => 'Add success',
            'result' => $discounts
        ]);
    }

    public function show($id)
    {
        $discount = Discount::find($id);

        return response()->json([
            'message' => 'Success',
            'result' => $discount
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'status' => 'required'
        ]);

        $discount = Discount::find($id);
        $discount->fill($request->input());

        $discount->save();

        return response()->json([
            'message' => 'Update success',
            'result' => $discount
        ]);
    }
}
