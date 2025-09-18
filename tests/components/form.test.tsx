import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Test form schema
const testFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  terms: z.boolean().refine((value) => value, {
    message: 'You must accept the terms and conditions',
  }),
  country: z.string().min(1, 'Please select a country'),
  bio: z.string().optional(),
});

type TestFormData = z.infer<typeof testFormSchema>;

// Test form component
function TestForm({ onSubmit }: { onSubmit: (data: TestFormData) => void }) {
  const form = useForm<TestFormData>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
      terms: false,
      country: '',
      bio: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>Your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

describe('Form Component', () => {
  let mockSubmit: ReturnType<typeof vi.fn>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    mockSubmit = vi.fn();
    user = userEvent.setup();
  });

  it('renders form with all fields', () => {
    render(<TestForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('displays form descriptions', () => {
    render(<TestForm onSubmit={mockSubmit} />);

    expect(screen.getByText('Your full name')).toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      expect(screen.getByText('Please select a country')).toBeInTheDocument();
      expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('validates minimum age', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    const ageInput = screen.getByLabelText(/age/i);
    await user.clear(ageInput);
    await user.type(ageInput, '16');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Must be at least 18 years old')).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('validates name minimum length', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'A');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    // Fill in all required fields
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John Doe');

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'john@example.com');

    const ageInput = screen.getByLabelText(/age/i);
    await user.clear(ageInput);
    await user.type(ageInput, '25');

    // Select country
    const countrySelect = screen.getByRole('combobox');
    await user.click(countrySelect);
    const usOption = screen.getByText('United States');
    await user.click(usOption);

    // Accept terms
    const termsCheckbox = screen.getByLabelText(/accept terms/i);
    await user.click(termsCheckbox);

    // Optional bio
    const bioTextarea = screen.getByLabelText(/bio/i);
    await user.type(bioTextarea, 'This is my bio');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
        country: 'us',
        bio: 'This is my bio',
        terms: true,
      });
    });
  });

  it('clears validation errors when fields are corrected', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    // Submit to trigger validation errors
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });

    // Fix the name field
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John Doe');

    await waitFor(() => {
      expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument();
    });
  });

  it('handles checkbox state changes', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    const termsCheckbox = screen.getByLabelText(/accept terms/i);
    
    // Initially unchecked
    expect(termsCheckbox).not.toBeChecked();

    // Check the checkbox
    await user.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();

    // Uncheck the checkbox
    await user.click(termsCheckbox);
    expect(termsCheckbox).not.toBeChecked();
  });

  it('handles select field changes', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    const countrySelect = screen.getByRole('combobox');
    await user.click(countrySelect);

    const ukOption = screen.getByText('United Kingdom');
    await user.click(ukOption);

    // Verify the select shows the selected value
    expect(screen.getByDisplayValue('United Kingdom')).toBeInTheDocument();
  });

  it('handles textarea input', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    const bioTextarea = screen.getByLabelText(/bio/i);
    const bioText = 'This is a longer bio text that spans multiple lines and contains various information about the user.';
    
    await user.type(bioTextarea, bioText);
    expect(bioTextarea).toHaveValue(bioText);
  });

  it('handles number input correctly', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    const ageInput = screen.getByLabelText(/age/i);
    
    await user.clear(ageInput);
    await user.type(ageInput, '30');
    
    expect(ageInput).toHaveValue(30);
  });

  it('prevents form submission when validation fails', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    // Fill only some fields (missing required ones)
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Should show validation errors and not call onSubmit
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('allows optional fields to be empty', async () => {
    render(<TestForm onSubmit={mockSubmit} />);

    // Fill all required fields but leave bio empty
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John Doe');

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'john@example.com');

    const ageInput = screen.getByLabelText(/age/i);
    await user.clear(ageInput);
    await user.type(ageInput, '25');

    const countrySelect = screen.getByRole('combobox');
    await user.click(countrySelect);
    const usOption = screen.getByText('United States');
    await user.click(usOption);

    const termsCheckbox = screen.getByLabelText(/accept terms/i);
    await user.click(termsCheckbox);

    // Leave bio empty
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
        country: 'us',
        bio: '',
        terms: true,
      });
    });
  });
});

// Test individual form components
describe('Form Sub-components', () => {
  it('renders FormLabel correctly', () => {
    render(<FormLabel>Test Label</FormLabel>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders FormDescription correctly', () => {
    render(<FormDescription>Test description</FormDescription>);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders FormMessage correctly', () => {
    render(<FormMessage>Error message</FormMessage>);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies custom className to FormLabel', () => {
    render(<FormLabel className="custom-class">Test Label</FormLabel>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-class');
  });

  it('applies custom className to FormDescription', () => {
    render(<FormDescription className="custom-desc">Test description</FormDescription>);
    const description = screen.getByText('Test description');
    expect(description).toHaveClass('custom-desc');
  });

  it('applies custom className to FormMessage', () => {
    render(<FormMessage className="custom-message">Error message</FormMessage>);
    const message = screen.getByText('Error message');
    expect(message).toHaveClass('custom-message');
  });
});