"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Filter,
  Star,
  Truck,
  Shield,
  Zap,
  Heart,
  ShoppingCart
} from "lucide-react"

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199,
    rating: 4.5,
    category: "Electronics",
    inStock: true,
    freeShipping: true,
    featured: true,
    onSale: false
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299,
    rating: 4.8,
    category: "Electronics",
    inStock: true,
    freeShipping: true,
    featured: false,
    onSale: true
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 129,
    rating: 4.2,
    category: "Sports",
    inStock: false,
    freeShipping: false,
    featured: true,
    onSale: false
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 89,
    rating: 4.0,
    category: "Home",
    inStock: true,
    freeShipping: true,
    featured: false,
    onSale: true
  }
]

export default function ToggleFilterPanel() {
  const [filters, setFilters] = useState({
    inStock: false,
    freeShipping: false,
    featured: false,
    onSale: false,
    highRated: false
  })

  const handleFilterToggle = (key: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const filteredProducts = products.filter(product => {
    if (filters.inStock && !product.inStock) return false
    if (filters.freeShipping && !product.freeShipping) return false
    if (filters.featured && !product.featured) return false
    if (filters.onSale && !product.onSale) return false
    if (filters.highRated && product.rating < 4.5) return false
    return true
  })

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {activeFiltersCount}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">In Stock</span>
                  </div>
                  <Toggle
                    pressed={filters.inStock}
                    onPressedChange={() => handleFilterToggle('inStock')}
                    size="sm"
                    aria-label="Filter by in stock"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Free Shipping</span>
                  </div>
                  <Toggle
                    pressed={filters.freeShipping}
                    onPressedChange={() => handleFilterToggle('freeShipping')}
                    size="sm"
                    aria-label="Filter by free shipping"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                  <Toggle
                    pressed={filters.featured}
                    onPressedChange={() => handleFilterToggle('featured')}
                    size="sm"
                    aria-label="Filter by featured"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">On Sale</span>
                  </div>
                  <Toggle
                    pressed={filters.onSale}
                    onPressedChange={() => handleFilterToggle('onSale')}
                    size="sm"
                    aria-label="Filter by on sale"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">High Rated (4.5+)</span>
                  </div>
                  <Toggle
                    pressed={filters.highRated}
                    onPressedChange={() => handleFilterToggle('highRated')}
                    size="sm"
                    aria-label="Filter by high rating"
                  />
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <>
                  <Separator />
                  <button
                    onClick={() => setFilters({
                      inStock: false,
                      freeShipping: false,
                      featured: false,
                      onSale: false,
                      highRated: false
                    })}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear all filters
                  </button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Products ({filteredProducts.length})
            </h2>
            {activeFiltersCount > 0 && (
              <p className="text-sm text-muted-foreground">
                Showing filtered results
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {product.featured && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {product.onSale && (
                        <Badge variant="destructive" className="text-xs">
                          Sale
                        </Badge>
                      )}
                      {product.freeShipping && (
                        <Badge variant="outline" className="text-xs">
                          <Truck className="h-3 w-3 mr-1" />
                          Free Shipping
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price}</span>
                      <div className="flex items-center gap-2">
                        {!product.inStock && (
                          <Badge variant="secondary" className="text-xs">
                            Out of Stock
                          </Badge>
                        )}
                        <button 
                          disabled={!product.inStock}
                          className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products match your current filters.
              </p>
              <button
                onClick={() => setFilters({
                  inStock: false,
                  freeShipping: false,
                  featured: false,
                  onSale: false,
                  highRated: false
                })}
                className="mt-2 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}