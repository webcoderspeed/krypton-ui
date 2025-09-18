import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Stepper, StepperItem } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Settings, Shield, CheckCircle } from 'lucide-react';

describe('Stepper Component', () => {
  describe('Basic Rendering', () => {
    it('renders stepper with single step', () => {
      render(
        <Stepper>
          <StepperItem title="Step 1">
            <p>Step 1 content</p>
          </StepperItem>
        </Stepper>
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 1 content')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders stepper with multiple steps', () => {
      render(
        <Stepper>
          <StepperItem title="First Step">
            <p>First step content</p>
          </StepperItem>
          <StepperItem title="Second Step">
            <p>Second step content</p>
          </StepperItem>
          <StepperItem title="Third Step">
            <p>Third step content</p>
          </StepperItem>
        </Stepper>
      );

      expect(screen.getByText('First Step')).toBeInTheDocument();
      expect(screen.getByText('Second Step')).toBeInTheDocument();
      expect(screen.getByText('Third Step')).toBeInTheDocument();
      expect(screen.getByText('First step content')).toBeInTheDocument();
      expect(screen.getByText('Second step content')).toBeInTheDocument();
      expect(screen.getByText('Third step content')).toBeInTheDocument();
      
      // Check step numbers
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders stepper without content (minimal)', () => {
      render(
        <Stepper>
          <StepperItem title="Step 1" />
          <StepperItem title="Step 2" />
          <StepperItem title="Step 3" />
        </Stepper>
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders stepper with proper structure', () => {
      render(
        <Stepper>
          <StepperItem title="Step 1">Content</StepperItem>
        </Stepper>
      );

      const stepper = screen.getByRole('list');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Content Rendering', () => {
    it('renders complex content with HTML elements', () => {
      render(
        <Stepper>
          <StepperItem title="Complex Step">
            <div>
              <h3>Heading</h3>
              <p>Paragraph content</p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
              </ul>
            </div>
          </StepperItem>
        </Stepper>
      );

      expect(screen.getByText('Complex Step')).toBeInTheDocument();
      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
      expect(screen.getByText('List item 1')).toBeInTheDocument();
      expect(screen.getByText('List item 2')).toBeInTheDocument();
    });

    it('renders content with interactive elements', () => {
      render(
        <Stepper>
          <StepperItem title="Interactive Step">
            <div>
              <Button>Click me</Button>
              <input type="text" placeholder="Enter text" />
            </div>
          </StepperItem>
        </Stepper>
      );

      expect(screen.getByText('Interactive Step')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders content with badges and icons', () => {
      render(
        <Stepper>
          <StepperItem title="Step with Icons">
            <div>
              <User className="h-5 w-5" />
              <Badge>New</Badge>
              <span>Content with icon and badge</span>
            </div>
          </StepperItem>
        </Stepper>
      );

      expect(screen.getByText('Step with Icons')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByText('Content with icon and badge')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Stepper>
          <StepperItem title="Accessible Step">
            <p>Accessible content</p>
          </StepperItem>
        </Stepper>
      );

      const stepper = screen.getByRole('list');
      expect(stepper).toBeInTheDocument();
      
      const stepItem = screen.getByRole('listitem');
      expect(stepItem).toBeInTheDocument();
    });

    it('maintains proper heading hierarchy', () => {
      render(
        <Stepper>
          <StepperItem title="Step 1">
            <h3>Subheading</h3>
            <p>Content</p>
          </StepperItem>
        </Stepper>
      );

      const stepTitle = screen.getByText('Step 1');
      expect(stepTitle.tagName).toBe('H3');
      
      const subheading = screen.getByText('Subheading');
      expect(subheading.tagName).toBe('H3');
    });

    it('supports keyboard navigation when interactive elements are present', async () => {
      const user = userEvent.setup();
      
      render(
        <Stepper>
          <StepperItem title="Interactive Step">
            <Button>First Button</Button>
            <Button>Second Button</Button>
          </StepperItem>
        </Stepper>
      );

      const firstButton = screen.getByText('First Button');
      const secondButton = screen.getByText('Second Button');

      await user.tab();
      expect(firstButton).toHaveFocus();

      await user.tab();
      expect(secondButton).toHaveFocus();
    });
  });

  describe('Real-world Examples', () => {
    const EcommerceCheckoutWrapper = () => (
      <Stepper>
        <StepperItem title="Shopping Cart">
          <div className="space-y-4">
            <h3>Review Your Cart</h3>
            <Badge>3 items</Badge>
            <div>
              <p>Wireless Headphones - $99.99</p>
              <p>USB-C Cable - $29.98</p>
            </div>
            <p>Total: $129.97</p>
          </div>
        </StepperItem>
        
        <StepperItem title="Shipping Information">
          <div>
            <h3>Delivery Details</h3>
            <p>Standard Delivery - Free</p>
            <p>Express Delivery - $9.99</p>
          </div>
        </StepperItem>
        
        <StepperItem title="Payment Method">
          <div>
            <h3>Payment Information</h3>
            <p>Credit Card **** 1234</p>
            <p>Total: $151.16</p>
          </div>
        </StepperItem>
        
        <StepperItem title="Order Confirmation">
          <div>
            <CheckCircle className="h-6 w-6" />
            <h3>Order Confirmed</h3>
            <p>Order #ORD-2024-001</p>
            <Button>Track Order</Button>
          </div>
        </StepperItem>
      </Stepper>
    );

    it('renders e-commerce checkout stepper', () => {
      render(<EcommerceCheckoutWrapper />);
      
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
      expect(screen.getByText('Shipping Information')).toBeInTheDocument();
      expect(screen.getByText('Payment Method')).toBeInTheDocument();
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
      
      expect(screen.getByText('Review Your Cart')).toBeInTheDocument();
      expect(screen.getByText('3 items')).toBeInTheDocument();
      expect(screen.getByText('Total: $129.97')).toBeInTheDocument();
      expect(screen.getByText('Track Order')).toBeInTheDocument();
    });

    const OnboardingFlowWrapper = () => (
      <Stepper>
        <StepperItem title="Welcome">
          <div>
            <h3>Welcome to Our Platform</h3>
            <p>We're excited to have you join our community.</p>
            <Badge>Getting Started</Badge>
          </div>
        </StepperItem>
        
        <StepperItem title="Account Setup">
          <div>
            <User className="h-6 w-6" />
            <h3>Create Your Account</h3>
            <p>Email: john.doe@example.com</p>
            <Badge>Required</Badge>
          </div>
        </StepperItem>
        
        <StepperItem title="Security Setup">
          <div>
            <Shield className="h-6 w-6" />
            <h3>Secure Your Account</h3>
            <p>Two-factor authentication enabled</p>
          </div>
        </StepperItem>
        
        <StepperItem title="Complete">
          <div>
            <CheckCircle className="h-6 w-6" />
            <h3>You're All Set!</h3>
            <Button>Start Exploring</Button>
          </div>
        </StepperItem>
      </Stepper>
    );

    it('renders user onboarding flow stepper', () => {
      render(<OnboardingFlowWrapper />);
      
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByText('Account Setup')).toBeInTheDocument();
      expect(screen.getByText('Security Setup')).toBeInTheDocument();
      expect(screen.getByText('Complete')).toBeInTheDocument();
      
      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
      expect(screen.getByText('Create Your Account')).toBeInTheDocument();
      expect(screen.getByText('Secure Your Account')).toBeInTheDocument();
      expect(screen.getByText('You&apos;re All Set!')).toBeInTheDocument();
      expect(screen.getByText('Start Exploring')).toBeInTheDocument();
    });

    const ProjectSetupWrapper = () => (
      <Stepper>
        <StepperItem title="Create Repository">
          <div>
            <h3>Initialize Git Repository</h3>
            <code>git init my-project</code>
            <Badge>Version Control</Badge>
          </div>
        </StepperItem>
        
        <StepperItem title="Install Dependencies">
          <div>
            <h3>Package Management</h3>
            <code>npm install react typescript</code>
            <Badge>npm</Badge>
          </div>
        </StepperItem>
        
        <StepperItem title="Deploy Application">
          <div>
            <h3>Production Deployment</h3>
            <p>Deployed to https://my-project.vercel.app</p>
            <Badge className="bg-green-600">Live</Badge>
          </div>
        </StepperItem>
      </Stepper>
    );

    it('renders project setup stepper', () => {
      render(<ProjectSetupWrapper />);
      
      expect(screen.getByText('Create Repository')).toBeInTheDocument();
      expect(screen.getByText('Install Dependencies')).toBeInTheDocument();
      expect(screen.getByText('Deploy Application')).toBeInTheDocument();
      
      expect(screen.getByText('Initialize Git Repository')).toBeInTheDocument();
      expect(screen.getByText('Package Management')).toBeInTheDocument();
      expect(screen.getByText('Production Deployment')).toBeInTheDocument();
      expect(screen.getByText('git init my-project')).toBeInTheDocument();
      expect(screen.getByText('npm install react typescript')).toBeInTheDocument();
    });
  });

  describe('Interactive Behavior', () => {
    const InteractiveStepperWrapper = () => {
      const [currentStep, setCurrentStep] = useState(0);
      
      return (
        <div>
          <Stepper>
            <StepperItem title="Step 1">
              <div>
                <p>Step 1 content</p>
                <Button onClick={() => setCurrentStep(1)}>Next</Button>
              </div>
            </StepperItem>
            <StepperItem title="Step 2">
              <div>
                <p>Step 2 content</p>
                <Button onClick={() => setCurrentStep(0)}>Previous</Button>
                <Button onClick={() => setCurrentStep(2)}>Next</Button>
              </div>
            </StepperItem>
            <StepperItem title="Step 3">
              <div>
                <p>Step 3 content</p>
                <Button onClick={() => setCurrentStep(1)}>Previous</Button>
                <Button>Finish</Button>
              </div>
            </StepperItem>
          </Stepper>
          <p data-testid="current-step">Current step: {currentStep + 1}</p>
        </div>
      );
    };

    it('handles interactive navigation between steps', async () => {
      const user = userEvent.setup();
      
      render(<InteractiveStepperWrapper />);
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('Current step: 1');
      
      // Navigate to step 2
      await user.click(screen.getByText('Next'));
      expect(screen.getByTestId('current-step')).toHaveTextContent('Current step: 2');
      
      // Navigate to step 3
      const nextButtons = screen.getAllByText('Next');
      await user.click(nextButtons[0]);
      expect(screen.getByTestId('current-step')).toHaveTextContent('Current step: 3');
      
      // Navigate back to step 2
      const previousButtons = screen.getAllByText('Previous');
      await user.click(previousButtons[0]);
      expect(screen.getByTestId('current-step')).toHaveTextContent('Current step: 2');
    });

    it('handles form interactions within steps', async () => {
      const user = userEvent.setup();
      
      render(
        <Stepper>
          <StepperItem title="Form Step">
            <form>
              <input type="text" placeholder="Enter name" />
              <input type="email" placeholder="Enter email" />
              <Button type="submit">Submit</Button>
            </form>
          </StepperItem>
        </Stepper>
      );

      const nameInput = screen.getByPlaceholderText('Enter name');
      const emailInput = screen.getByPlaceholderText('Enter email');
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      
      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty stepper gracefully', () => {
      render(<Stepper />);
      
      const stepper = screen.getByRole('list');
      expect(stepper).toBeInTheDocument();
      expect(stepper.children).toHaveLength(0);
    });

    it('handles stepper with only titles (no content)', () => {
      render(
        <Stepper>
          <StepperItem title="Title Only 1" />
          <StepperItem title="Title Only 2" />
        </Stepper>
      );

      expect(screen.getByText('Title Only 1')).toBeInTheDocument();
      expect(screen.getByText('Title Only 2')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('handles very long step titles', () => {
      const longTitle = 'This is a very long step title that might wrap to multiple lines and should be handled gracefully by the component';
      
      render(
        <Stepper>
          <StepperItem title={longTitle}>
            <p>Content for long title step</p>
          </StepperItem>
        </Stepper>
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText('Content for long title step')).toBeInTheDocument();
    });

    it('handles special characters in titles and content', () => {
      render(
        <Stepper>
          <StepperItem title="Step with Special Characters: @#$%^&*()">
            <p>Content with special characters: {"<>&\"&apos;"}</p>
          </StepperItem>
        </Stepper>
      );

      expect(screen.getByText('Step with Special Characters: @#$%^&*()')).toBeInTheDocument();
      expect(screen.getByText('Content with special characters: <>&"\'')).toBeInTheDocument();
    });

    it('handles large number of steps', () => {
      const steps = Array.from({ length: 20 }, (_, i) => (
        <StepperItem key={i} title={`Step ${i + 1}`}>
          <p>Content for step {i + 1}</p>
        </StepperItem>
      ));

      render(<Stepper>{steps}</Stepper>);

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 10')).toBeInTheDocument();
      expect(screen.getByText('Step 20')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct CSS classes for layout', () => {
      render(
        <Stepper>
          <StepperItem title="Styled Step">
            <p>Styled content</p>
          </StepperItem>
        </Stepper>
      );

      const stepper = screen.getByRole('list');
      expect(stepper).toHaveClass('space-y-8');
      
      const stepItem = screen.getByRole('listitem');
      expect(stepItem).toHaveClass('relative', 'flex', 'gap-6', 'pb-8');
    });

    it('applies step number styling', () => {
      render(
        <Stepper>
          <StepperItem title="Numbered Step">
            <p>Content</p>
          </StepperItem>
        </Stepper>
      );

      const stepNumber = screen.getByText('1');
      expect(stepNumber.parentElement).toHaveClass(
        'flex',
        'h-10',
        'w-10',
        'shrink-0',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-primary',
        'text-primary-foreground',
        'text-sm',
        'font-medium'
      );
    });

    it('applies connector line styling for multiple steps', () => {
      render(
        <Stepper>
          <StepperItem title="Step 1">Content 1</StepperItem>
          <StepperItem title="Step 2">Content 2</StepperItem>
        </Stepper>
      );

      const firstStepItem = screen.getByText('Step 1').closest('li');
      const connector = firstStepItem?.querySelector('.absolute.left-5.top-10');
      expect(connector).toBeInTheDocument();
      expect(connector).toHaveClass('h-full', 'w-px', 'bg-border');
    });
  });
});