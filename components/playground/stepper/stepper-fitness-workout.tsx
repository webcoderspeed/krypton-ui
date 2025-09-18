import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Timer, Zap, Heart, Trophy } from "lucide-react";

export default function StepperFitnessWorkout() {
  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="font-semibold mb-2">Full Body HIIT Workout</h3>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            30 mins
          </span>
          <span className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            High Intensity
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            Cardio + Strength
          </span>
        </div>
      </div>
      
      <Stepper>
        <StepperItem title="Warm-Up">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Prepare your body</span>
              <Badge variant="secondary">5 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Arm circles - 30 seconds</p>
              <p>• Leg swings - 30 seconds each leg</p>
              <p>• Light jogging in place - 2 minutes</p>
              <p>• Dynamic stretches - 2 minutes</p>
            </div>
            <div className="bg-blue-50 p-2 rounded text-xs">
              💡 Focus on gradually increasing your heart rate
            </div>
            <Button size="sm">Start Warm-Up</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Circuit 1: Upper Body">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Strength & power</span>
              <Badge variant="secondary">8 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Push-ups - 45 sec work, 15 sec rest</p>
              <p>• Mountain climbers - 45 sec work, 15 sec rest</p>
              <p>• Burpees - 45 sec work, 15 sec rest</p>
              <p>• Plank hold - 45 sec work, 15 sec rest</p>
              <p className="font-medium">Repeat 2 rounds</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Start Circuit</Button>
              <Button size="sm" variant="outline">View Form Tips</Button>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Active Recovery">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Catch your breath</span>
              <Badge variant="secondary">2 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Walking in place - 1 minute</p>
              <p>• Deep breathing exercises</p>
              <p>• Light stretching</p>
              <p>• Hydrate and prepare for next circuit</p>
            </div>
            <div className="bg-green-50 p-2 rounded text-xs">
              💧 Remember to stay hydrated throughout
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Circuit 2: Lower Body">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Legs & glutes</span>
              <Badge variant="secondary">8 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Jump squats - 45 sec work, 15 sec rest</p>
              <p>• Lunges (alternating) - 45 sec work, 15 sec rest</p>
              <p>• High knees - 45 sec work, 15 sec rest</p>
              <p>• Wall sit - 45 sec work, 15 sec rest</p>
              <p className="font-medium">Repeat 2 rounds</p>
            </div>
            <Button size="sm">Start Circuit</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Core Finisher">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Abs & core</span>
              <Badge variant="secondary">5 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Bicycle crunches - 30 seconds</p>
              <p>• Russian twists - 30 seconds</p>
              <p>• Dead bug - 30 seconds each side</p>
              <p>• Plank to downward dog - 30 seconds</p>
              <p>• Rest 30 seconds between exercises</p>
            </div>
            <Button size="sm">Final Push!</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Cool Down & Stretch">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-green-600">Workout complete!</span>
              <Badge variant="secondary">5 mins</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>🎉 Great job finishing the workout!</p>
              <p>• Forward fold stretch - 1 minute</p>
              <p>• Quad stretch - 30 seconds each leg</p>
              <p>• Shoulder stretch - 30 seconds each arm</p>
              <p>• Deep breathing and relaxation</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Log Workout</Button>
              <Button size="sm" variant="outline">Rate Difficulty</Button>
            </div>
          </div>
        </StepperItem>
      </Stepper>
    </div>
  );
}