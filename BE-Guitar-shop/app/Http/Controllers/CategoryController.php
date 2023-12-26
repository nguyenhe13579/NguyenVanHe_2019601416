<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $total = Category::all()->count();
        $categories = Category::query()
        ->leftJoin('products', 'products.category_id', '=', 'categories.id')
        ->select('categories.*')
        ->selectRaw('count(products.id) as product_count')
        ->groupBy('categories.id')
        ->get();

        return response()->json([
            'message' => 'Success',
            'result' => [
                'total' => $total,
                'categories' =>$categories
            ]
            ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'status' => 'required|numeric'
        ]);

        $category = Category::create($request->input());

        return response()->json([
            'message' => 'Add success',
            'result' => $category
        ]);
    }

    public function show($id)
    {
        $category = Category::find($id);

        return response()->json([
            'message' => 'Success',
            'result' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'status' => 'boolean|numeric'
        ]);

        $category = Category::find($id);
        $category->fill($request->input());

        $category->save();

        return response()->json([
            'message' => 'Update success',
            'result' => $category
        ]);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();

        return response()->json([
            'message' => 'Delete success', 
            'result' => $category
        ]);
    }
}
