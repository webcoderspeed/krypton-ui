"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart } from "lucide-react"

export default function ProductDetailsDialog() {
  const [quantity, setQuantity] = useState(1)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Wireless Bluetooth Headphones</DialogTitle>
          <DialogDescription>
            Premium quality headphones with noise cancellation
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Product Image</div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.8) 234 reviews</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">$199.99</span>
                <span className="text-lg text-muted-foreground line-through">$249.99</span>
                <Badge variant="destructive">20% OFF</Badge>
              </div>
              
              <div className="grid gap-2">
                <h4 className="font-medium">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Active Noise Cancellation</li>
                  <li>• 30-hour battery life</li>
                  <li>• Bluetooth 5.0 connectivity</li>
                  <li>• Premium leather ear cups</li>
                </ul>
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <Badge variant="secondary">In Stock</Badge>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">
            <Heart className="h-4 w-4 mr-2" />
            Add to Wishlist
          </Button>
          <Button>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}