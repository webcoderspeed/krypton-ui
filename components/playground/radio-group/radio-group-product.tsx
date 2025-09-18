"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

export default function RadioGroupProduct() {
  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedColor, setSelectedColor] = useState("black");

  const sizes = [
    { value: "xs", label: "XS", available: true, price: 29.99 },
    { value: "s", label: "S", available: true, price: 29.99 },
    { value: "m", label: "M", available: true, price: 29.99 },
    { value: "l", label: "L", available: true, price: 29.99 },
    { value: "xl", label: "XL", available: false, price: 29.99 },
    { value: "xxl", label: "XXL", available: true, price: 34.99 }
  ];

  const colors = [
    { value: "black", label: "Black", color: "bg-black", available: true },
    { value: "white", label: "White", color: "bg-white border", available: true },
    { value: "navy", label: "Navy", color: "bg-blue-900", available: true },
    { value: "gray", label: "Gray", color: "bg-gray-500", available: false },
    { value: "red", label: "Red", color: "bg-red-600", available: true }
  ];

  const selectedSizeData = sizes.find(size => size.value === selectedSize);
  const selectedColorData = colors.find(color => color.value === selectedColor);

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Premium Cotton T-Shirt
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.8 (124 reviews)</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Size</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Choose your preferred size
              </p>
            </div>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-3 gap-3">
              {sizes.map((size) => (
                <div key={size.value} className="relative">
                  <div className={`flex items-center justify-center rounded-lg border-2 p-4 transition-colors ${
                    !size.available 
                      ? 'opacity-50 cursor-not-allowed bg-muted' 
                      : 'hover:bg-accent/50 cursor-pointer'
                  } ${selectedSize === size.value ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem 
                      value={size.value} 
                      id={`size-${size.value}`} 
                      disabled={!size.available}
                      className="sr-only"
                    />
                    <Label 
                      htmlFor={`size-${size.value}`} 
                      className={`text-center cursor-pointer ${!size.available ? 'cursor-not-allowed' : ''}`}
                    >
                      <div className="font-semibold text-lg">{size.label}</div>
                      {size.price !== 29.99 && (
                        <div className="text-xs text-muted-foreground">+${(size.price - 29.99).toFixed(2)}</div>
                      )}
                    </Label>
                    {!size.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-background px-2 py-1 rounded text-xs font-medium">
                          Out of Stock
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Color</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Choose your preferred color
              </p>
            </div>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <div key={color.value} className="relative">
                  <div className={`flex items-center space-x-3 rounded-lg border p-3 transition-colors ${
                    !color.available 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-accent/50 cursor-pointer'
                  } ${selectedColor === color.value ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem 
                      value={color.value} 
                      id={`color-${color.value}`} 
                      disabled={!color.available}
                    />
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full ${color.color} ${!color.available ? 'opacity-50' : ''}`} />
                      <Label 
                        htmlFor={`color-${color.value}`} 
                        className={`font-medium ${!color.available ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {color.label}
                        {!color.available && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Out of Stock
                          </Badge>
                        )}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Selected:</p>
                <p className="font-medium">
                  {selectedSizeData?.label} • {selectedColorData?.label}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${selectedSizeData?.price}</p>
                <p className="text-sm text-muted-foreground">Free shipping</p>
              </div>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              disabled={!selectedSizeData?.available || !selectedColorData?.available}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}