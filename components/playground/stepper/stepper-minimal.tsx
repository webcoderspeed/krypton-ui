import { Stepper, StepperItem } from "@/components/ui/stepper";

export default function StepperMinimal() {
  return (
    <div className="w-full max-w-xs">
      <Stepper>
        <StepperItem title="Login" />
        <StepperItem title="Dashboard" />
        <StepperItem title="Settings" />
        <StepperItem title="Complete" />
      </Stepper>
    </div>
  );
}