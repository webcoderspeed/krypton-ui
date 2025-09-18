import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Test wrapper component for controlled select
function ControlledSelectWrapper() {
  const [value, setValue] = useState<string>('');
  
  return (
    <div>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
      <div data-testid="selected-value">{value}</div>
    </div>
  );
}

// Test wrapper component for grouped select
function GroupedSelectWrapper() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a food item" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Test wrapper component for disabled select
function DisabledSelectWrapper() {
  return (
    <div>
      <Select disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
      
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select with disabled items" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana" disabled>Banana (disabled)</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

// Test wrapper component for default value select
function DefaultValueSelectWrapper() {
  return (
    <Select defaultValue="banana">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  );
}

// Test wrapper component for select with custom content
function CustomContentSelectWrapper() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">
          <div className="flex items-center gap-2">
            <span>🇺🇸</span>
            <span>United States</span>
          </div>
        </SelectItem>
        <SelectItem value="uk">
          <div className="flex items-center gap-2">
            <span>🇬🇧</span>
            <span>United Kingdom</span>
          </div>
        </SelectItem>
        <SelectItem value="ca">
          <div className="flex items-center gap-2">
            <span>🇨🇦</span>
            <span>Canada</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

describe('Select Component', () => {
  describe('Basic Select', () => {
    it('renders select trigger with placeholder', () => {
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
      
      expect(screen.getByText('Select a fruit')).toBeInTheDocument();
    });
    
    it('opens content when trigger is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
      });
    });
    
    it('selects item when clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Apple'));
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Apple')).toBeInTheDocument();
      });
    });
    
    it('supports custom className on trigger', () => {
      const { container } = render(
        <Select>
          <SelectTrigger className="custom-trigger">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = container.querySelector('.custom-trigger');
      expect(trigger).toBeInTheDocument();
    });
  });
  
  describe('Controlled Select', () => {
    it('updates value when controlled', async () => {
      const user = userEvent.setup();
      
      render(<ControlledSelectWrapper />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Apple'));
      
      await waitFor(() => {
        expect(screen.getByTestId('selected-value')).toHaveTextContent('apple');
      });
    });
    
    it('calls onValueChange when value changes', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      
      render(
        <Select onValueChange={onValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Apple'));
      
      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith('apple');
      });
    });
  });
  
  describe('Default Value', () => {
    it('shows default value on initial render', () => {
      render(<DefaultValueSelectWrapper />);
      
      expect(screen.getByDisplayValue('Banana')).toBeInTheDocument();
    });
  });
  
  describe('Disabled State', () => {
    it('disables select when disabled prop is true', () => {
      render(
        <Select disabled>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });
    
    it('does not open when disabled trigger is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <Select disabled>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      // Content should not appear
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
    
    it('renders disabled items correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana" disabled>Banana (disabled)</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        const disabledItem = screen.getByText('Banana (disabled)');
        expect(disabledItem).toBeInTheDocument();
        // Check if the item has disabled attributes
        expect(disabledItem.closest('[role="option"]')).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });
  
  describe('Grouped Select', () => {
    it('renders groups with labels', async () => {
      const user = userEvent.setup();
      
      render(<GroupedSelectWrapper />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Carrot')).toBeInTheDocument();
      });
    });
    
    it('renders separator between groups', async () => {
      const user = userEvent.setup();
      
      render(<GroupedSelectWrapper />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        const separator = screen.getByRole('separator');
        expect(separator).toBeInTheDocument();
      });
    });
  });
  
  describe('Custom Content', () => {
    it('renders custom content in items', async () => {
      const user = userEvent.setup();
      
      render(<CustomContentSelectWrapper />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('🇺🇸')).toBeInTheDocument();
        expect(screen.getByText('United States')).toBeInTheDocument();
        expect(screen.getByText('🇬🇧')).toBeInTheDocument();
        expect(screen.getByText('United Kingdom')).toBeInTheDocument();
      });
    });
  });
  
  describe('Keyboard Navigation', () => {
    it('opens select with Enter key', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
    });
    
    it('opens select with Space key', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      
      await user.keyboard(' ');
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
    });
    
    it('navigates items with arrow keys', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      
      // Navigate down
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      
      // Select with Enter
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Orange')).toBeInTheDocument();
      });
    });
    
    it('closes select with Escape key', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
      });
    });
  });
  
  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    });
    
    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });
    
    it('has correct role attributes for items', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        const items = screen.getAllByRole('option');
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveAttribute('data-value', 'apple');
        expect(items[1]).toHaveAttribute('data-value', 'banana');
      });
    });
  });
  
  describe('Form Integration', () => {
    it('works with form name attribute', () => {
      render(
        <Select name="fruit-select">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const hiddenInput = document.querySelector('input[name="fruit-select"]');
      expect(hiddenInput).toBeInTheDocument();
    });
    
    it('supports required attribute', () => {
      render(
        <Select required>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-required', 'true');
    });
  });
  
  describe('Edge Cases', () => {
    it('handles empty content gracefully', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {/* No items */}
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      // Should not crash and content should be empty
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
    
    it('handles rapid clicks gracefully', async () => {
      const user = userEvent.setup();
      
      render(
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      
      const trigger = screen.getByRole('combobox');
      
      // Rapid clicks
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);
      
      // Should still work correctly
      expect(trigger).toBeInTheDocument();
    });
  });
});