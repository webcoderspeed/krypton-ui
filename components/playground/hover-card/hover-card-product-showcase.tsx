"use client";

import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Heart,
  ShoppingCart,
  Eye,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&crop=center",
    badge: "Best Seller",
    inStock: true,
    freeShipping: true,
    features: ["Noise Cancellation", "30h Battery", "Quick Charge"]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&crop=center",
    badge: "New",
    inStock: true,
    freeShipping: true,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant"]
  },
  {
    id: 3,
    name: "Mechanical Gaming Keyboard",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=200&fit=crop&crop=center",
    badge: "Limited Edition",
    inStock: false,
    freeShipping: true,
    features: ["RGB Backlight", "Cherry MX Switches", "Programmable Keys"]
  }
];

export default function HoverCardProductShowcase() {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Product Showcase</h3>
        <p className="text-sm text-muted-foreground">
          Hover over products to see detailed information and quick actions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {products.map((product) => (
          <HoverCard key={product.id}>
            <HoverCardTrigger asChild>
              <div className="cursor-pointer group">
                <div className="relative overflow-hidden rounded-lg border bg-card">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge 
                      className="absolute top-2 left-2"
                      variant={product.badge === "New" ? "default" : product.badge === "Best Seller" ? "secondary" : "outline"}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites[product.id] ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-medium line-clamp-2">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-96" side="top">
              <div className="space-y-4">
                {/* Product Header */}
                <div className="flex gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold line-clamp-2">{product.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {product.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Shipping & Policies */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>{product.freeShipping ? "Free shipping" : "Standard shipping"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>2-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    <span>30-day return policy</span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Notify Me'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites[product.id] ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}