import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

export default function DrawerFilterPanel() {
  const categories = [
    { id: "electronics", label: "Electronics", count: 245 },
    { id: "clothing", label: "Clothing", count: 189 },
    { id: "books", label: "Books", count: 156 },
    { id: "home", label: "Home & Garden", count: 98 },
    { id: "sports", label: "Sports", count: 67 },
  ];

  const brands = [
    { id: "apple", label: "Apple", count: 45 },
    { id: "samsung", label: "Samsung", count: 38 },
    { id: "nike", label: "Nike", count: 29 },
    { id: "adidas", label: "Adidas", count: 24 },
    { id: "sony", label: "Sony", count: 19 },
  ];

  const activeFilters = ["Electronics", "$50 - $200", "Apple"];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilters.length > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFilters.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Products</DrawerTitle>
          <DrawerDescription>
            Refine your search results
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                    {filter}
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                ))}
              </div>
              <Separator />
            </div>
          )}

          {/* Price Range */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={[50, 200]}
                max={500}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$0</span>
                <span>$500</span>
              </div>
              <div className="text-center text-sm font-medium mt-2">
                $50 - $200
              </div>
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={category.id} />
                    <Label htmlFor={category.id} className="text-sm font-normal">
                      {category.label}
                    </Label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({category.count})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Brands */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={brand.id} />
                    <Label htmlFor={brand.id} className="text-sm font-normal">
                      {brand.label}
                    </Label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({brand.count})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Rating */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Customer Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="text-sm font-normal flex items-center">
                    {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                    <span className="ml-1">& up</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DrawerFooter>
          <div className="flex space-x-2">
            <Button className="flex-1">Apply Filters</Button>
            <Button variant="outline" className="flex-1">Clear All</Button>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}