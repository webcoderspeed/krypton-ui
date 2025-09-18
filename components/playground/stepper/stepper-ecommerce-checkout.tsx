import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard, Truck, CheckCircle } from "lucide-react";

export default function StepperEcommerceCheckout() {
  return (
    <div className="w-full max-w-2xl">
      <Stepper>
        <StepperItem title="Shopping Cart">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Review your items</span>
              <Badge variant="secondary">3 items</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• iPhone 15 Pro - $999</p>
              <p>• AirPods Pro - $249</p>
              <p>• MagSafe Charger - $39</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="font-medium">Total: $1,287</span>
              <Button size="sm">Continue to Shipping</Button>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Shipping Information">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Delivery details</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>John Doe</p>
              <p>123 Main Street, Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>Estimated delivery: 2-3 business days</p>
            </div>
            <Button size="sm" variant="outline">Edit Address</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Payment Method">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Payment details</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Visa ending in 4242</p>
              <p>Expires 12/25</p>
              <p>Billing address same as shipping</p>
            </div>
            <Button size="sm">Place Order</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Order Confirmation">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Order placed successfully!</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Order #ORD-2024-001</p>
              <p>Confirmation email sent to john@example.com</p>
              <p>Track your order in the Orders section</p>
            </div>
            <Button size="sm" variant="outline">View Order Details</Button>
          </div>
        </StepperItem>
      </Stepper>
    </div>
  );
}