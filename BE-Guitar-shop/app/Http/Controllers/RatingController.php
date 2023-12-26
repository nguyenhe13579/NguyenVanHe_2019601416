<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;

class RatingController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'product_id' => 'required',
            'score' => 'required'
        ]);

        $rating = Rating::create($request->input());

        return response()->json([
            'message' => 'Rating success',
            'result' => $rating
        ]);
    }

    public function show(Request $request)
    {
        $this->validate($request, [
            'product_id' => 'required'
        ]);
        $avgScore = Rating::query()->where('product_id', $request['product_id'])
        ->groupBy('product_id')
        ->avg('score');
        $total = Rating::query()->where('product_id', $request['product_id'])->count();
        $rated = Rating::query()->where([
            'product_id' => $request['product_id'],
            'user_id' => $request['user_id']
        ])->get();

        return response()->json([
            'message' => 'Success',
            'result' => [
                'score' => $avgScore,
                'total' => $total,
                'rated' => $rated
            ]
        ]);
    }
}
