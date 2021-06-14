<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name','cost','count','description','user_id','image'];

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public static function hasProduct($id, $countProduct)
    {
        $product = Product::where('id',$id)->get('count');
        return $product[0]->count >= $countProduct;
    }

    public static function removeCountProduct($id, $countProduct)
    {
        $product = Product::find($id);
        $newCount = $product->count - $countProduct;
        $product->update([
          'count' => $newCount
        ]);
    }
}
