<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function generate(Request $request) {

        $file = $request->file('file');

        $file_handle = fopen($file, 'r');

        fgetcsv($file_handle, 0, ';');

        $products = [];

        while (($row = fgetcsv($file_handle, 0, ';')) !== false) {

            $name = $row[0];
            $cost = $row[1];
            $count = $row[2];
            $description = $row[3];

            $product = Product::create([
                'name' => $name,
                'cost' => $cost,
                'count' => $count,
                'description' => $description,
                'user_id' => 1
            ]);

            $products[] = $product;
        }

        return response()->json($products);
    }
}
