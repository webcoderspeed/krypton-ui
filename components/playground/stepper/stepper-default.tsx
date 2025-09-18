import { Stepper, StepperItem } from "@/components/ui/stepper";

export default function StepperDefault() {
  return (
    <div className="w-full max-w-md">
      <Stepper>
        <StepperItem title="Create Account">
          Enter your email and password to create a new account.
        </StepperItem>
        <StepperItem title="Verify Email">
          Check your inbox and click the verification link.
        </StepperItem>
        <StepperItem title="Complete Profile">
          Add your personal information and profile picture.
        </StepperItem>
        <StepperItem title="Start Using">
          You&apos;re all set! Start exploring the platform.
        </StepperItem>
      </Stepper>
    </div>
  );
}