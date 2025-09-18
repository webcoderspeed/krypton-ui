"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

const products = [
  { id: 1, name: "MacBook Pro 16", category: "laptops", brand: "apple", price: 2499, rating: 4.8 },
  { id: 2, name: "Dell XPS 13", category: "laptops", brand: "dell", price: 1299, rating: 4.6 },
  { id: 3, name: "iPhone 15 Pro", category: "phones", brand: "apple", price: 999, rating: 4.7 },
  { id: 4, name: "Samsung Galaxy S24", category: "phones", brand: "samsung", price: 899, rating: 4.5 },
  { id: 5, name: "iPad Air", category: "tablets", brand: "apple", price: 599, rating: 4.6 },
  { id: 6, name: "Surface Pro 9", category: "tablets", brand: "microsoft", price: 1099, rating: 4.4 },
  { id: 7, name: "ThinkPad X1", category: "laptops", brand: "lenovo", price: 1599, rating: 4.5 },
  { id: 8, name: "Galaxy Tab S9", category: "tablets", brand: "samsung", price: 749, rating: 4.3 },
]

export default function SelectProductFilter() {
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [brandFilter, setBrandFilter] = useState<string>("")
  const [priceFilter, setPriceFilter] = useState<string>("")
  const [ratingFilter, setRatingFilter] = useState<string>("")
  
  const filteredProducts = products.filter(product => {
    if (categoryFilter && product.category !== categoryFilter) return false
    if (brandFilter && product.brand !== brandFilter) return false
    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number)
      if (max && (product.price < min || product.price > max)) return false
      if (!max && product.price < min) return false
    }
    if (ratingFilter && product.rating < Number(ratingFilter)) return false
    return true
  })
  
  const clearAllFilters = () => {
    setCategoryFilter("")
    setBrandFilter("")
    setPriceFilter("")
    setRatingFilter("")
  }
  
  const activeFiltersCount = [categoryFilter, brandFilter, priceFilter, ratingFilter].filter(Boolean).length

  return (
    <div className="w-[500px]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Product Filter
          </CardTitle>
          <CardDescription>
            Filter products by category, brand, price, and rating
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="phones">Phones</SelectItem>
                  <SelectItem value="tablets">Tablets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Brands</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="samsung">Samsung</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Other Brands</SelectLabel>
                    <SelectItem value="dell">Dell</SelectItem>
                    <SelectItem value="lenovo">Lenovo</SelectItem>
                    <SelectItem value="microsoft">Microsoft</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500">Under $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
                  <SelectItem value="1500-2000">$1,500 - $2,000</SelectItem>
                  <SelectItem value="2000">Over $2,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Rating</label>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.5">4.5+ stars</SelectItem>
                  <SelectItem value="4.0">4.0+ stars</SelectItem>
                  <SelectItem value="3.5">3.5+ stars</SelectItem>
                  <SelectItem value="3.0">3.0+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                </Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllFilters}
                className="h-8"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredProducts.map(product => (
              <div key={product.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {product.brand}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        ⭐ {product.rating}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-lg">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No products match your filters</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}