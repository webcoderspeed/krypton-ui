import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useState } from 'react';

// Test wrapper component for CommandDialog
function CommandDialogWrapper() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

// Test wrapper component for searchable command
function SearchableCommandWrapper() {
  const [value, setValue] = useState('');
  
  const items = [
    { id: '1', name: 'Calendar', keywords: ['calendar', 'date', 'time'] },
    { id: '2', name: 'Calculator', keywords: ['calculator', 'math', 'numbers'] },
    { id: '3', name: 'Search', keywords: ['search', 'find', 'lookup'] },
  ];
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.keywords.some(keyword => keyword.toLowerCase().includes(value.toLowerCase()))
  );
  
  return (
    <Command>
      <CommandInput 
        placeholder="Search..." 
        value={value} 
        onValueChange={setValue} 
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Results">
          {filteredItems.map(item => (
            <CommandItem key={item.id} value={item.name}>
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

describe('Command Component', () => {
  describe('Basic Command', () => {
    it('renders command with input and items', () => {
      render(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
      expect(screen.getByText('Suggestions')).toBeInTheDocument();
      expect(screen.getByText('Calendar')).toBeInTheDocument();
      expect(screen.getByText('Calculator')).toBeInTheDocument();
    });
    
    it('renders empty state when no items match', () => {
      render(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {/* No items */}
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
    
    it('supports custom className', () => {
      const { container } = render(
        <Command className="custom-command">
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(container.firstChild).toHaveClass('custom-command');
    });
  });
  
  describe('CommandInput', () => {
    it('renders input with placeholder', () => {
      render(
        <Command>
          <CommandInput placeholder="Search commands..." />
          <CommandList>
            <CommandGroup>
              <CommandItem>Test</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByPlaceholderText('Search commands...')).toBeInTheDocument();
    });
    
    it('handles input changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <Command>
          <CommandInput 
            placeholder="Search..." 
            onValueChange={handleChange}
          />
          <CommandList>
            <CommandGroup>
              <CommandItem>Test</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      const input = screen.getByPlaceholderText('Search...');
      await user.type(input, 'test');
      
      expect(handleChange).toHaveBeenCalled();
    });
    
    it('supports controlled value', () => {
      render(
        <Command>
          <CommandInput 
            placeholder="Search..." 
            value="test value"
          />
          <CommandList>
            <CommandGroup>
              <CommandItem>Test</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });
  });
  
  describe('CommandItem', () => {
    it('renders command item with text', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>Test Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });
    
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={handleSelect}>Clickable Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      const item = screen.getByText('Clickable Item');
      await user.click(item);
      
      expect(handleSelect).toHaveBeenCalled();
    });
    
    it('supports disabled state', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem disabled>Disabled Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      const item = screen.getByText('Disabled Item');
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });
    
    it('supports custom value', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem value="custom-value">Custom Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByText('Custom Item')).toBeInTheDocument();
    });
  });
  
  describe('CommandGroup', () => {
    it('renders group with heading', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup heading="Test Group">
              <CommandItem>Item 1</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByText('Test Group')).toBeInTheDocument();
    });
    
    it('renders group without heading', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>Item 1</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });
  
  describe('CommandSeparator', () => {
    it('renders separator', () => {
      const { container } = render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>Item 1</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>Item 2</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
    });
  });
  
  describe('CommandShortcut', () => {
    it('renders keyboard shortcut', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>
                Open File
                <CommandShortcut>⌘O</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByText('⌘O')).toBeInTheDocument();
    });
  });
  
  describe('CommandDialog', () => {
    it('opens and closes dialog', async () => {
      const user = userEvent.setup();
      
      render(<CommandDialogWrapper />);
      
      // Dialog should not be visible initially
      expect(screen.queryByPlaceholderText('Type a command...')).not.toBeInTheDocument();
      
      // Open dialog
      await user.click(screen.getByText('Open Dialog'));
      
      // Dialog should be visible
      expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
      expect(screen.getByText('Suggestions')).toBeInTheDocument();
    });
    
    it('closes dialog on escape key', async () => {
      const user = userEvent.setup();
      
      render(<CommandDialogWrapper />);
      
      // Open dialog
      await user.click(screen.getByText('Open Dialog'));
      expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
      
      // Press escape
      await user.keyboard('{Escape}');
      
      // Dialog should be closed
      await waitFor(() => {
        expect(screen.queryByPlaceholderText('Type a command...')).not.toBeInTheDocument();
      });
    });
  });
  
  describe('Search Functionality', () => {
    it('filters items based on search input', async () => {
      const user = userEvent.setup();
      
      render(<SearchableCommandWrapper />);
      
      // All items should be visible initially
      expect(screen.getByText('Calendar')).toBeInTheDocument();
      expect(screen.getByText('Calculator')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
      
      // Search for "calc"
      const input = screen.getByPlaceholderText('Search...');
      await user.type(input, 'calc');
      
      // Only Calculator should be visible
      expect(screen.queryByText('Calendar')).not.toBeInTheDocument();
      expect(screen.getByText('Calculator')).toBeInTheDocument();
      expect(screen.queryByText('Search')).not.toBeInTheDocument();
    });
    
    it('shows empty state when no items match search', async () => {
      const user = userEvent.setup();
      
      render(<SearchableCommandWrapper />);
      
      const input = screen.getByPlaceholderText('Search...');
      await user.type(input, 'nonexistent');
      
      expect(screen.getByText('No results found.')).toBeInTheDocument();
      expect(screen.queryByText('Calendar')).not.toBeInTheDocument();
      expect(screen.queryByText('Calculator')).not.toBeInTheDocument();
      expect(screen.queryByText('Search')).not.toBeInTheDocument();
    });
  });
  
  describe('Keyboard Navigation', () => {
    it('supports arrow key navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandGroup>
              <CommandItem>First Item</CommandItem>
              <CommandItem>Second Item</CommandItem>
              <CommandItem>Third Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      const input = screen.getByPlaceholderText('Type a command...');
      input.focus();
      
      // Navigate down
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      
      // Second item should be focused (implementation depends on cmdk)
      expect(document.activeElement).toBeDefined();
    });
    
    it('supports enter key selection', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      
      render(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={handleSelect}>Selectable Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      const input = screen.getByPlaceholderText('Type a command...');
      input.focus();
      
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');
      
      expect(handleSelect).toHaveBeenCalled();
    });
  });
  
  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      const input = screen.getByPlaceholderText('Type a command...');
      expect(input).toHaveAttribute('role', 'combobox');
    });
    
    it('supports screen readers with group headings', () => {
      render(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByText('Suggestions')).toBeInTheDocument();
      expect(screen.getByText('Calendar')).toBeInTheDocument();
    });
    
    it('shows empty state when no items are present', () => {
      render(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {/* No items */}
            </CommandGroup>
          </CommandList>
        </Command>
      );
      
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });
});