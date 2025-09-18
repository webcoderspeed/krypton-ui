import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Thermometer, Utensils } from "lucide-react";

export default function StepperRecipeCooking() {
  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Classic Chocolate Chip Cookies</h3>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            45 mins
          </span>
          <span className="flex items-center gap-1">
            <ChefHat className="h-3 w-3" />
            Easy
          </span>
          <span className="flex items-center gap-1">
            <Utensils className="h-3 w-3" />
            24 cookies
          </span>
        </div>
      </div>
      
      <Stepper>
        <StepperItem title="Prepare Ingredients">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Gather and measure</span>
              <Badge variant="secondary">5 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• 2¼ cups all-purpose flour</p>
              <p>• 1 tsp baking soda</p>
              <p>• 1 cup butter, softened</p>
              <p>• ¾ cup granulated sugar</p>
              <p>• 2 large eggs</p>
              <p>• 2 cups chocolate chips</p>
            </div>
            <Button size="sm" variant="outline">View Full Ingredients</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Mix Dry Ingredients">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Combine flour mixture</span>
              <Badge variant="secondary">3 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>1. In a medium bowl, whisk together flour and baking soda</p>
              <p>2. Add salt and mix well</p>
              <p>3. Set aside for later use</p>
            </div>
            <div className="bg-blue-50 p-2 rounded text-xs">
              💡 Tip: Sifting the flour creates lighter cookies
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Cream Butter & Sugar">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Create base mixture</span>
              <Badge variant="secondary">5 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>1. Beat butter until light and fluffy (3-4 minutes)</p>
              <p>2. Gradually add both sugars</p>
              <p>3. Beat until well combined</p>
              <p>4. Add eggs one at a time</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded text-xs">
              ⚠️ Make sure butter is at room temperature
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Combine & Add Chips">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Final mixing</span>
              <Badge variant="secondary">3 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>1. Gradually mix in flour mixture</p>
              <p>2. Mix until just combined (don&apos;t overmix)</p>
              <p>3. Fold in chocolate chips</p>
              <p>4. Dough should be thick and chunky</p>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Bake the Cookies">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Baking time</span>
              <Badge variant="secondary">12 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>1. Preheat oven to 375°F (190°C)</p>
              <p>2. Drop rounded tablespoons on baking sheet</p>
              <p>3. Bake for 9-11 minutes until golden brown</p>
              <p>4. Cool on baking sheet for 2 minutes</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Set Timer</Button>
              <Button size="sm" variant="outline">Temperature Guide</Button>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Cool & Enjoy">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Ready to serve!</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>🍪 Transfer to wire rack to cool completely</p>
              <p>Store in airtight container for up to 1 week</p>
              <p>Serve with milk or coffee</p>
              <p>Makes about 24 delicious cookies</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Rate Recipe</Button>
              <Button size="sm" variant="outline">Share</Button>
            </div>
          </div>
        </StepperItem>
      </Stepper>
    </div>
  );
}