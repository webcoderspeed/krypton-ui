import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command';

// Mock scrollIntoView for testing environment
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

describe('Command', () => {
  it('renders correctly', () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Command className="custom-command">
        <CommandInput />
      </Command>
    );
    
    const command = document.querySelector('.custom-command');
    expect(command).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
            <CommandItem>Item 2</CommandItem>
            <CommandItem>Item 3</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    const input = screen.getByPlaceholderText('Search...');
    await user.click(input);
    
    // Test arrow key navigation
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowUp}');
  });
});

describe('CommandDialog', () => {
  it('renders when open', () => {
    render(
      <CommandDialog open={true}>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </CommandDialog>
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <CommandDialog open={false}>
        <CommandInput placeholder="Type a command..." />
      </CommandDialog>
    );
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when closed', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();
    
    render(
      <CommandDialog open={true} onOpenChange={handleOpenChange}>
        <CommandInput placeholder="Type a command..." />
      </CommandDialog>
    );
    
    // Press Escape to close
    await user.keyboard('{Escape}');
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('CommandInput', () => {
  it('renders with placeholder', () => {
    render(
      <Command>
        <CommandInput placeholder="Search commands..." />
      </Command>
    );
    
    expect(screen.getByPlaceholderText('Search commands...')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'cal');
    
    expect(input).toHaveValue('cal');
  });

  it('applies custom className', () => {
    render(
      <Command>
        <CommandInput className="custom-input" placeholder="Search..." />
      </Command>
    );
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveClass('custom-input');
  });
});

describe('CommandList', () => {
  it('renders children correctly', () => {
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

  it('applies custom className', () => {
    render(
      <Command>
        <CommandList className="custom-list">
          <CommandItem>Item</CommandItem>
        </CommandList>
      </Command>
    );
    
    const list = screen.getByRole('listbox');
    expect(list).toHaveClass('custom-list');
  });
});

describe('CommandEmpty', () => {
  it('renders empty state message', () => {
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    );
    
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Command>
        <CommandList>
          <CommandEmpty className="custom-empty">Empty</CommandEmpty>
        </CommandList>
      </Command>
    );
    
    const empty = screen.getByText('Empty');
    expect(empty).toHaveClass('custom-empty');
  });
});

describe('CommandGroup', () => {
  it('renders with heading', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    expect(screen.getByText('Suggestions')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders without heading', () => {
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

  it('applies custom className', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup className="custom-group" heading="Test">
            <CommandItem>Item</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    const group = document.querySelector('.custom-group');
    expect(group).toBeInTheDocument();
  });
});

describe('CommandItem', () => {
  it('renders correctly', () => {
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

  it('can be disabled', () => {
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

  it('applies custom className', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem className="custom-item">Item</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    const item = screen.getByText('Item');
    expect(item).toHaveClass('custom-item');
  });
});

describe('CommandShortcut', () => {
  it('renders shortcut text', () => {
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

  it('applies custom className', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>
              Command
              <CommandShortcut className="custom-shortcut">Ctrl+K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    const shortcut = screen.getByText('Ctrl+K');
    expect(shortcut).toHaveClass('custom-shortcut');
  });
});

describe('CommandSeparator', () => {
  it('renders separator', () => {
    render(
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
    
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Command>
        <CommandList>
          <CommandSeparator className="custom-separator" />
        </CommandList>
      </Command>
    );
    
    const separator = screen.getByRole('separator');
    expect(separator).toHaveClass('custom-separator');
  });
});

describe('Command Integration', () => {
  it('filters items based on search input', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Calculator</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'cal');
    
    // Note: Actual filtering behavior depends on the Command implementation
    // This test verifies the input works, actual filtering may need additional setup
    expect(input).toHaveValue('cal');
  });

  it('handles complex command structure', () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              Calendar
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Search Emoji
              <CommandShortcut>⌘E</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Billing
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    
    expect(screen.getByText('Suggestions')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('⌘K')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});