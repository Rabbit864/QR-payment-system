<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use QrCode;

class ProductController extends Controller
{
    public function generate(Request $request)
    {

        $file = $request->file('file');

        $file_handle = fopen($file, 'r');

        fgetcsv($file_handle, 0, ';');

        $products = [];

        while (($row = fgetcsv($file_handle, 0, ';')) !== false) {


            $name = $row[0];
            $cost = $row[1];
            $count = $row[2];
            $image = $row[3];
            $description = $row[4];


            $product = Product::create([
                'name' => $name,
                'cost' => $cost,
                'count' => $count,
                'description' => $description,
                'image' => $image,
                'user_id' => $request->user_id
            ]);

            $url = env("QR_URL") . "/products/{$product->id}";
            $qr = QrCode::format('png')->size(100)->generate($url);
            $qr = base64_encode($qr);
            $product['qr'] = $qr;
            $products[] = $product;
        }

        return response()->json($products);
    }

    public function index(User $user)
    {
        $products = Product::where('user_id', $user->id)->get();
        foreach ($products as $product) {
            $url = env("QR_URL") . "/products/{$product->id}";
            $qr = QrCode::format('png')->size(100)->generate($url);
            $qr = base64_encode($qr);
            $product['qr'] = $qr;
        }
        return response()->json($products);
    }


    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function delete(Product $product)
    {
        $product->delete();

        return response(['success' => true]);
    }

    public function update(Request $request, Product $product)
    {
        $result = $product->update([
            'name' => $request->name,
            'cost' => $request->cost,
            'count' => $request->count,
            'description' => $request->description
        ]);

        if (!$result) {
            return response(['success' => false, 'message' => 'Не удалось обновить товар']);
        }

        return response(['success' => true]);
    }

    public function handlingBasket(Request $request)
    {
        $cart = $request->cart;
        \Log::alert($cart);
        foreach($cart as $product){
            \Log::alert($product["id"]);
            if(!Product::hasProduct($product["id"], $product["quantity"])){
                return response(['success' => false, 'message' => 'Данного товара уже нет в наличии']);
            }
            Product::removeCountProduct($product["id"], $product["quantity"]);
        }

        return response(['success' => true]);
    }
}
