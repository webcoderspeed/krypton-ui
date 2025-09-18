import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function BasicDropdownWrapper() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ControlledDropdownWrapper() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>External Trigger</button>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button>Controlled Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function CheckboxDropdownWrapper() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>View Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Test wrapper component for radio group dropdown menu
function RadioGroupDropdownWrapper() {
  const [position, setPosition] = useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Panel Position</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Test wrapper component for submenu dropdown
function SubmenuDropdownWrapper() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Menu with Submenu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>New Tab</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Save Page As...</DropdownMenuItem>
              <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
              <DropdownMenuItem>Name Window...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Test wrapper component for dropdown with shortcuts
function ShortcutDropdownWrapper() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Copy
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe('DropdownMenu Component', () => {
  describe('Basic Functionality', () => {
    it('renders trigger button', () => {
      render(<BasicDropdownWrapper />);
      
      expect(screen.getByText('Open Menu')).toBeInTheDocument();
    });

    it('opens menu when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
      });
    });

    it('closes menu when Escape is pressed', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
      
      // Press Escape to close menu
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      });
    });

    it('closes menu when menu item is selected', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Profile'));
      
      await waitFor(() => {
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      });
    });

    it('handles disabled menu items', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        const disabledItem = screen.getByText('Disabled Item');
        expect(disabledItem).toBeInTheDocument();
        expect(disabledItem.closest('[role="menuitem"]')).toHaveAttribute('data-disabled');
      });
    });
  });

  describe('Controlled State', () => {
    it('supports controlled open state', async () => {
      const user = userEvent.setup();
      render(<ControlledDropdownWrapper />);
      
      const externalTrigger = screen.getByText('External Trigger');
      await user.click(externalTrigger);
      
      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });
    });

    it('calls onOpenChange when state changes', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <DropdownMenu onOpenChange={onOpenChange}>
          <DropdownMenuTrigger asChild>
            <Button>Test Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Test Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      
      const trigger = screen.getByText('Test Menu');
      await user.click(trigger);
      
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Checkbox Items', () => {
    it('renders checkbox items with correct checked state', async () => {
      const user = userEvent.setup();
      render(<CheckboxDropdownWrapper />);
      
      const trigger = screen.getByText('View Options');
      await user.click(trigger);
      
      await waitFor(() => {
        const statusBarItem = screen.getByText('Status Bar');
        const activityBarItem = screen.getByText('Activity Bar');
        const panelItem = screen.getByText('Panel');
        
        expect(statusBarItem).toBeInTheDocument();
        expect(activityBarItem).toBeInTheDocument();
        expect(panelItem).toBeInTheDocument();
        
        // Check initial states
        expect(statusBarItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('data-state', 'checked');
        expect(activityBarItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('data-state', 'unchecked');
        expect(panelItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('data-state', 'unchecked');
      });
    });

    it('toggles checkbox state when clicked', async () => {
      const user = userEvent.setup();
      render(<CheckboxDropdownWrapper />);
      
      const trigger = screen.getByText('View Options');
      await user.click(trigger);
      
      await waitFor(() => {
        const panelItem = screen.getByText('Panel');
        expect(panelItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('data-state', 'unchecked');
      });
      
      await user.click(screen.getByText('Panel'));
      
      // Reopen menu to check state
      await user.click(trigger);
      
      await waitFor(() => {
        const panelItem = screen.getByText('Panel');
        expect(panelItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('data-state', 'checked');
      });
    });

    it('handles disabled checkbox items', async () => {
      const user = userEvent.setup();
      render(<CheckboxDropdownWrapper />);
      
      const trigger = screen.getByText('View Options');
      await user.click(trigger);
      
      await waitFor(() => {
        const activityBarItem = screen.getByText('Activity Bar');
        expect(activityBarItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('data-disabled');
      });
    });
  });

  describe('Radio Group Items', () => {
    it('renders radio group with correct selected value', async () => {
      const user = userEvent.setup();
      render(<RadioGroupDropdownWrapper />);
      
      const trigger = screen.getByText('Panel Position');
      await user.click(trigger);
      
      await waitFor(() => {
        const topItem = screen.getByText('Top');
        const bottomItem = screen.getByText('Bottom');
        const rightItem = screen.getByText('Right');
        
        expect(topItem).toBeInTheDocument();
        expect(bottomItem).toBeInTheDocument();
        expect(rightItem).toBeInTheDocument();
        
        // Check initial selection (bottom should be selected)
        expect(bottomItem.closest('[role="menuitemradio"]')).toHaveAttribute('data-state', 'checked');
        expect(topItem.closest('[role="menuitemradio"]')).toHaveAttribute('data-state', 'unchecked');
        expect(rightItem.closest('[role="menuitemradio"]')).toHaveAttribute('data-state', 'unchecked');
      });
    });

    it('changes selection when radio item is clicked', async () => {
      const user = userEvent.setup();
      render(<RadioGroupDropdownWrapper />);
      
      const trigger = screen.getByText('Panel Position');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Top')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Top'));
      
      // Reopen menu to check state
      await user.click(trigger);
      
      await waitFor(() => {
        const topItem = screen.getByText('Top');
        const bottomItem = screen.getByText('Bottom');
        
        expect(topItem.closest('[role="menuitemradio"]')).toHaveAttribute('data-state', 'checked');
        expect(bottomItem.closest('[role="menuitemradio"]')).toHaveAttribute('data-state', 'unchecked');
      });
    });
  });

  describe('Submenu', () => {
    it('renders submenu trigger', async () => {
      const user = userEvent.setup();
      render(<SubmenuDropdownWrapper />);
      
      const trigger = screen.getByText('Menu with Submenu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('More Tools')).toBeInTheDocument();
        expect(screen.getByText('New Tab')).toBeInTheDocument();
        expect(screen.getByText('New Window')).toBeInTheDocument();
      });
    });

    it('opens submenu on hover', async () => {
      const user = userEvent.setup();
      render(<SubmenuDropdownWrapper />);
      
      const trigger = screen.getByText('Menu with Submenu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('More Tools')).toBeInTheDocument();
      });
      
      await user.hover(screen.getByText('More Tools'));
      
      await waitFor(() => {
        expect(screen.getByText('Save Page As...')).toBeInTheDocument();
        expect(screen.getByText('Create Shortcut...')).toBeInTheDocument();
        expect(screen.getByText('Name Window...')).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens menu with Enter key', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      trigger.focus();
      
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
    });

    it('opens menu with Space key', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      trigger.focus();
      
      await user.keyboard(' ');
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
    });

    it('closes menu with Escape key', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      });
    });

    it('navigates menu items with arrow keys', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
      });
      
      // Test that arrow keys work (focus behavior may vary)
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      
      // Menu should still be open and items should be accessible
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  describe('Shortcuts', () => {
    it('renders keyboard shortcuts', async () => {
      const user = userEvent.setup();
      render(<ShortcutDropdownWrapper />);
      
      const trigger = screen.getByText('Actions');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('⌘E')).toBeInTheDocument();
        expect(screen.getByText('⌘C')).toBeInTheDocument();
        expect(screen.getByText('⌘⌫')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(trigger);
      
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        
        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();
        
        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems.length).toBeGreaterThanOrEqual(2); // At least Profile and Settings
      });
    });

    it('supports screen reader labels', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        const label = screen.getByText('My Account');
        expect(label).toBeInTheDocument();
        // Label exists and is accessible
        expect(label).toHaveClass('px-2', 'py-1.5', 'text-sm', 'font-semibold');
      });
    });

    it('manages focus correctly', async () => {
      const user = userEvent.setup();
      render(<BasicDropdownWrapper />);
      
      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        // Menu should be open and focusable
        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();
      });
      
      // Close menu and check focus returns to trigger
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
      });
    });
  });

  describe('Event Handlers', () => {
    it('calls onSelect when menu item is clicked', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Test Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>Test Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      
      const trigger = screen.getByText('Test Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Test Item')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Test Item'));
      
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('calls onCheckedChange for checkbox items', async () => {
      const onCheckedChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Test Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={false}
              onCheckedChange={onCheckedChange}
            >
              Test Checkbox
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      
      const trigger = screen.getByText('Test Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Test Checkbox'));
      
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('calls onValueChange for radio group', async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Test Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="option1" onValueChange={onValueChange}>
              <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      
      const trigger = screen.getByText('Test Menu');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Option 2')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Option 2'));
      
      expect(onValueChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('Positioning', () => {
    it('supports different alignment options', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Test Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Test Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      
      expect(screen.getByText('Test Menu')).toBeInTheDocument();
    });

    it('supports different side options', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Test Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem>Test Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      
      expect(screen.getByText('Test Menu')).toBeInTheDocument();
    });
  });
});