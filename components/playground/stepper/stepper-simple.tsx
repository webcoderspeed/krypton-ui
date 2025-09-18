import { Stepper, StepperItem } from "@/components/ui/stepper";

export default function StepperSimple() {
  return (
    <div className="w-full max-w-sm">
      <Stepper>
        <StepperItem title="Step 1">
          First step description
        </StepperItem>
        <StepperItem title="Step 2">
          Second step description
        </StepperItem>
        <StepperItem title="Step 3">
          Third step description
        </StepperItem>
      </Stepper>
    </div>
  );
}