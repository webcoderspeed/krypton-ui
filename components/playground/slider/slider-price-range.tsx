"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SliderPriceRange() {
  const [priceRange, setPriceRange] = useState([100, 500]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">Price Filter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span className="font-medium">${priceRange[0]}</span>
            <span className="font-medium">${priceRange[1]}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Min: $0</span>
            <span>Max: $1000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}