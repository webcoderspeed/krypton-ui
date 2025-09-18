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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

export default function DrawerShoppingCart() {
  const cartItems = [
    { id: 1, name: "Wireless Headphones", price: 99.99, quantity: 1, image: "🎧" },
    { id: 2, name: "Smartphone Case", price: 24.99, quantity: 2, image: "📱" },
    { id: 3, name: "USB Cable", price: 12.99, quantity: 1, image: "🔌" },
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </Badge>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>
            Review your items before checkout
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
              <div className="text-2xl">{item.image}</div>
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(total + 5.99 + (total * 0.08)).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button className="w-full">Proceed to Checkout</Button>
          <DrawerClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}