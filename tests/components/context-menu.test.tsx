import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Card } from '@/components/ui/card';

// Test wrapper component for basic context menu
function BasicContextMenuWrapper() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="w-64 h-32 flex items-center justify-center cursor-pointer">
          <p>Right click here</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// Test wrapper component for checkbox context menu
function CheckboxContextMenuWrapper() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showUrls, setShowUrls] = useState(false);
  const [person, setPerson] = useState('pedro');

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="w-64 h-32 flex items-center justify-center cursor-pointer">
          <p>Right click for options</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showUrls}
          onCheckedChange={setShowUrls}
        >
          Show URLs
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>People</ContextMenuLabel>
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// Test wrapper component for submenu context menu
function SubmenuContextMenuWrapper() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="w-64 h-32 flex items-center justify-center cursor-pointer">
          <p>Right click for submenu</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Invite users</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Message</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Settings</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

describe('ContextMenu Component', () => {
  describe('Basic ContextMenu', () => {
    it('renders context menu trigger', () => {
      render(<BasicContextMenuWrapper />);
      
      expect(screen.getByText('Right click here')).toBeInTheDocument();
    });

    it('opens context menu on right click', async () => {
      const user = userEvent.setup();
      render(<BasicContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
      });
    });

    it('closes context menu on escape key', async () => {
      const user = userEvent.setup();
      render(<BasicContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      });
    });

    it('closes context menu when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <BasicContextMenuWrapper />
          <div data-testid="outside">Outside element</div>
        </div>
      );
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      });
    });

    it('executes onSelect callback when menu item is clicked', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      
      render(
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Card>Right click here</Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={onSelect}>Profile</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Profile'));
      
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<BasicContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
      });
      
      // Navigate with arrow keys
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      
      // Should focus on Logout item
      expect(screen.getByText('Logout')).toHaveFocus();
    });

    it('supports disabled menu items', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      
      render(
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Card>Right click here</Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem disabled onSelect={onSelect}>
              Disabled Item
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Disabled Item')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Disabled Item'));
      
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('ContextMenuSeparator', () => {
    it('renders separator correctly', async () => {
      const user = userEvent.setup();
      render(<BasicContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const separator = document.querySelector('[role="separator"]');
        expect(separator).toBeInTheDocument();
      });
    });
  });

  describe('ContextMenuShortcut', () => {
    it('renders keyboard shortcuts', async () => {
      const user = userEvent.setup();
      
      render(
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Card>Right click here</Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              Profile
              <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('⇧⌘P')).toBeInTheDocument();
      });
    });
  });

  describe('ContextMenuCheckboxItem', () => {
    it('renders checkbox items with correct checked state', async () => {
      const user = userEvent.setup();
      render(<CheckboxContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for options');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const bookmarksItem = screen.getByText('Show Bookmarks');
        const urlsItem = screen.getByText('Show URLs');
        
        expect(bookmarksItem).toBeInTheDocument();
        expect(urlsItem).toBeInTheDocument();
        
        // Check if checkbox states are correct
        expect(bookmarksItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('aria-checked', 'true');
        expect(urlsItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('aria-checked', 'false');
      });
    });

    it('toggles checkbox state when clicked', async () => {
      const user = userEvent.setup();
      render(<CheckboxContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for options');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Show URLs')).toBeInTheDocument();
      });
      
      const urlsItem = screen.getByText('Show URLs');
      await user.click(urlsItem);
      
      // Menu should close and reopen to check state
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const urlsItemAfter = screen.getByText('Show URLs');
        expect(urlsItemAfter.closest('[role="menuitemcheckbox"]')).toHaveAttribute('aria-checked', 'true');
      });
    });
  });

  describe('ContextMenuRadioGroup and ContextMenuRadioItem', () => {
    it('renders radio group with correct selected value', async () => {
      const user = userEvent.setup();
      render(<CheckboxContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for options');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const pedroItem = screen.getByText('Pedro');
        const colmItem = screen.getByText('Colm');
        
        expect(pedroItem).toBeInTheDocument();
        expect(colmItem).toBeInTheDocument();
        
        // Check if radio states are correct
        expect(pedroItem.closest('[role="menuitemradio"]')).toHaveAttribute('aria-checked', 'true');
        expect(colmItem.closest('[role="menuitemradio"]')).toHaveAttribute('aria-checked', 'false');
      });
    });

    it('changes radio selection when clicked', async () => {
      const user = userEvent.setup();
      render(<CheckboxContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for options');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Colm')).toBeInTheDocument();
      });
      
      const colmItem = screen.getByText('Colm');
      await user.click(colmItem);
      
      // Menu should close and reopen to check state
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const pedroItemAfter = screen.getByText('Pedro');
        const colmItemAfter = screen.getByText('Colm');
        
        expect(pedroItemAfter.closest('[role="menuitemradio"]')).toHaveAttribute('aria-checked', 'false');
        expect(colmItemAfter.closest('[role="menuitemradio"]')).toHaveAttribute('aria-checked', 'true');
      });
    });
  });

  describe('ContextMenuLabel', () => {
    it('renders label correctly', async () => {
      const user = userEvent.setup();
      render(<CheckboxContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for options');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('People')).toBeInTheDocument();
      });
    });
  });

  describe('ContextMenuSub', () => {
    it('renders submenu trigger', async () => {
      const user = userEvent.setup();
      render(<SubmenuContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for submenu');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Invite users')).toBeInTheDocument();
      });
    });

    it('opens submenu on hover', async () => {
      const user = userEvent.setup();
      render(<SubmenuContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for submenu');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Invite users')).toBeInTheDocument();
      });
      
      const subTrigger = screen.getByText('Invite users');
      await user.hover(subTrigger);
      
      await waitFor(() => {
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Message')).toBeInTheDocument();
      });
    });

    it('opens submenu with arrow key navigation', async () => {
      const user = userEvent.setup();
      render(<SubmenuContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for submenu');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Invite users')).toBeInTheDocument();
      });
      
      // Navigate to submenu trigger and hover to open
      const submenuTrigger = screen.getByText('Invite users');
      await user.hover(submenuTrigger);
      
      await waitFor(() => {
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Message')).toBeInTheDocument();
      });
    });

    it('closes submenu with left arrow key', async () => {
      const user = userEvent.setup();
      render(<SubmenuContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for submenu');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Invite users')).toBeInTheDocument();
      });
      
      const subTrigger = screen.getByText('Invite users');
      await user.hover(subTrigger);
      
      await waitFor(() => {
        expect(screen.getByText('Email')).toBeInTheDocument();
      });
      
      // Close submenu with escape
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Email')).not.toBeInTheDocument();
      });
    });
  });

  describe('Custom className support', () => {
    it('applies custom className to ContextMenuContent', async () => {
      const user = userEvent.setup();
      
      render(
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Card>Right click here</Card>
          </ContextMenuTrigger>
          <ContextMenuContent className="custom-menu">
            <ContextMenuItem>Profile</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const menuContent = screen.getByText('Profile').closest('[role="menu"]');
        expect(menuContent).toHaveClass('custom-menu');
      });
    });

    it('applies custom className to ContextMenuItem', async () => {
      const user = userEvent.setup();
      
      render(
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Card>Right click here</Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem className="custom-item">Profile</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const menuItem = screen.getByText('Profile');
        expect(menuItem).toHaveClass('custom-item');
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', async () => {
      const user = userEvent.setup();
      render(<BasicContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const menu = screen.getByRole('menu');
        const menuItems = screen.getAllByRole('menuitem');
        
        expect(menu).toBeInTheDocument();
        expect(menuItems).toHaveLength(3);
        
        menuItems.forEach(item => {
          expect(item).toHaveAttribute('role', 'menuitem');
        });
      });
    });

    it('manages focus correctly', async () => {
      const user = userEvent.setup();
      render(<BasicContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click here');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();
      });
    });

    it('supports screen reader announcements', async () => {
      const user = userEvent.setup();
      render(<CheckboxContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for options');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        const checkboxItems = screen.getAllByRole('menuitemcheckbox');
        const radioItems = screen.getAllByRole('menuitemradio');
        
        expect(checkboxItems).toHaveLength(2);
        expect(radioItems).toHaveLength(2);
        
        checkboxItems.forEach(item => {
          expect(item).toHaveAttribute('aria-checked');
        });
        
        radioItems.forEach(item => {
          expect(item).toHaveAttribute('aria-checked');
        });
      });
    });
  });
});

// Integration tests with real-world scenarios
describe('ContextMenu Integration Tests', () => {
  it('works with file operations pattern', async () => {
    const onDelete = vi.fn();
    const onRename = vi.fn();
    const user = userEvent.setup();
    
    const FileContextMenu = () => (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="file-item">document.txt</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem onSelect={onRename}>Rename</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={onDelete} className="text-red-600">
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    
    render(<FileContextMenu />);
    
    const file = screen.getByText('document.txt');
    await user.pointer({ keys: '[MouseRight]', target: file });
    
    await waitFor(() => {
      expect(screen.getByText('Open')).toBeInTheDocument();
      expect(screen.getByText('Rename')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
    
    // Test delete action
    await user.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('works with table row pattern', async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const user = userEvent.setup();
    
    const TableRowContextMenu = () => (
      <table>
        <tbody>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <tr>
                <td>John Doe</td>
                <td>john@example.com</td>
              </tr>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>View Profile</ContextMenuItem>
              <ContextMenuItem onSelect={onEdit}>Edit User</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onSelect={onDelete}>Delete User</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </tbody>
      </table>
    );
    
    render(<TableRowContextMenu />);
    
    const row = screen.getByText('John Doe').closest('tr');
    await user.pointer({ keys: '[MouseRight]', target: row! });
    
    await waitFor(() => {
      expect(screen.getByText('View Profile')).toBeInTheDocument();
      expect(screen.getByText('Edit User')).toBeInTheDocument();
      expect(screen.getByText('Delete User')).toBeInTheDocument();
    });
    
    // Test edit action
    await user.click(screen.getByText('Edit User'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('handles multiple context menus on the same page', async () => {
    const user = userEvent.setup();
    
    const MultipleContextMenus = () => (
      <div>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div>First trigger</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>First menu item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div>Second trigger</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Second menu item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
    
    render(<MultipleContextMenus />);
    
    // Open first context menu
    const firstTrigger = screen.getByText('First trigger');
    await user.pointer({ keys: '[MouseRight]', target: firstTrigger });
    
    await waitFor(() => {
      expect(screen.getByText('First menu item')).toBeInTheDocument();
    });
    
    // Close first menu by pressing Escape
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(screen.queryByText('First menu item')).not.toBeInTheDocument();
    });
    
    // Open second context menu
    const secondTrigger = screen.getByText('Second trigger');
    await user.pointer({ keys: '[MouseRight]', target: secondTrigger });
    
    await waitFor(() => {
      expect(screen.getByText('Second menu item')).toBeInTheDocument();
    });
  });

  it('handles nested context menus correctly', async () => {
      const user = userEvent.setup();
      render(<SubmenuContextMenuWrapper />);
      
      const trigger = screen.getByText('Right click for submenu');
      await user.pointer({ keys: '[MouseRight]', target: trigger });
      
      await waitFor(() => {
        expect(screen.getByText('Invite users')).toBeInTheDocument();
      });
      
      // Open first submenu
      const subTrigger = screen.getByText('Invite users');
      await user.hover(subTrigger);
      
      await waitFor(() => {
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Message')).toBeInTheDocument();
      });
    });
});