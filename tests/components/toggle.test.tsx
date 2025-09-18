import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, Underline, Heart } from 'lucide-react';

describe('Toggle Component', () => {
  describe('Basic Functionality', () => {
    it('renders toggle with correct role', () => {
      render(<Toggle aria-label="Toggle test" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toBeInTheDocument();
      expect(toggleElement).toHaveAttribute('type', 'button');
    });

    it('renders with default unpressed state', () => {
      render(<Toggle aria-label="Toggle test" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
      expect(toggleElement).toHaveAttribute('data-state', 'off');
    });

    it('renders with pressed state when defaultPressed is true', () => {
      render(<Toggle defaultPressed aria-label="Toggle test" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'true');
      expect(toggleElement).toHaveAttribute('data-state', 'on');
    });

    it('toggles state when clicked', async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="Toggle test" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
      
      await user.click(toggleElement);
      expect(toggleElement).toHaveAttribute('aria-pressed', 'true');
      expect(toggleElement).toHaveAttribute('data-state', 'on');
      
      await user.click(toggleElement);
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
      expect(toggleElement).toHaveAttribute('data-state', 'off');
    });

    it('calls onPressedChange when state changes', async () => {
      const onPressedChange = vi.fn();
      const user = userEvent.setup();
      
      render(<Toggle onPressedChange={onPressedChange} aria-label="Toggle test" />);
      
      const toggleElement = screen.getByRole('button');
      await user.click(toggleElement);
      
      expect(onPressedChange).toHaveBeenCalledWith(true);
      
      await user.click(toggleElement);
      expect(onPressedChange).toHaveBeenCalledWith(false);
      expect(onPressedChange).toHaveBeenCalledTimes(2);
    });

    it('works as controlled component', async () => {
      const ControlledToggle = () => {
        const [pressed, setPressed] = useState(false);
        return (
          <div>
            <Toggle 
              pressed={pressed} 
              onPressedChange={setPressed} 
              aria-label="Controlled toggle"
            />
            <span data-testid="state">{pressed ? 'on' : 'off'}</span>
          </div>
        );
      };

      const user = userEvent.setup();
      render(<ControlledToggle />);
      
      const toggleElement = screen.getByRole('button');
      const stateElement = screen.getByTestId('state');
      
      expect(stateElement).toHaveTextContent('off');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
      
      await user.click(toggleElement);
      
      expect(stateElement).toHaveTextContent('on');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled toggle correctly', () => {
      render(<Toggle disabled aria-label="Disabled toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toBeDisabled();
      expect(toggleElement).toHaveAttribute('data-disabled');
    });

    it('does not toggle when disabled and clicked', async () => {
      const onPressedChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Toggle 
          disabled 
          onPressedChange={onPressedChange} 
          aria-label="Disabled toggle"
        />
      );
      
      const toggleElement = screen.getByRole('button');
      await user.click(toggleElement);
      
      expect(onPressedChange).not.toHaveBeenCalled();
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
    });

    it('applies disabled styling', () => {
      render(<Toggle disabled aria-label="Disabled toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('disabled:pointer-events-none');
      expect(toggleElement).toHaveClass('disabled:opacity-50');
    });
  });

  describe('Variants', () => {
    it('applies default variant styling', () => {
      render(<Toggle variant="default" aria-label="Default toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('bg-transparent');
      expect(toggleElement).toHaveClass('hover:bg-muted');
      expect(toggleElement).toHaveClass('hover:text-muted-foreground');
    });

    it('applies outline variant styling', () => {
      render(<Toggle variant="outline" aria-label="Outline toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('border');
      expect(toggleElement).toHaveClass('border-input');
      expect(toggleElement).toHaveClass('bg-transparent');
    });

    it('applies pressed state styling for default variant', () => {
      render(<Toggle variant="default" defaultPressed aria-label="Pressed toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('data-[state=on]:bg-accent');
      expect(toggleElement).toHaveClass('data-[state=on]:text-accent-foreground');
    });

    it('applies pressed state styling for outline variant', () => {
      render(<Toggle variant="outline" defaultPressed aria-label="Pressed outline toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('data-[state=on]:bg-accent');
      expect(toggleElement).toHaveClass('data-[state=on]:text-accent-foreground');
    });
  });

  describe('Sizes', () => {
    it('applies default size styling', () => {
      render(<Toggle size="default" aria-label="Default size toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('h-10');
      expect(toggleElement).toHaveClass('px-3');
    });

    it('applies small size styling', () => {
      render(<Toggle size="sm" aria-label="Small toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('h-9');
      expect(toggleElement).toHaveClass('px-2.5');
    });

    it('applies large size styling', () => {
      render(<Toggle size="lg" aria-label="Large toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('h-11');
      expect(toggleElement).toHaveClass('px-5');
    });
  });

  describe('Content and Icons', () => {
    it('renders with icon content', () => {
      render(
        <Toggle aria-label="Bold toggle">
          <Bold className="h-4 w-4" />
        </Toggle>
      );
      
      const toggleElement = screen.getByRole('button');
      const iconElement = toggleElement.querySelector('svg');
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveClass('h-4', 'w-4');
    });

    it('renders with text content', () => {
      render(<Toggle aria-label="Text toggle">Bold</Toggle>);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveTextContent('Bold');
    });

    it('renders with icon and text content', () => {
      render(
        <Toggle aria-label="Icon and text toggle">
          <Bold className="h-4 w-4" />
          Bold
        </Toggle>
      );
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveTextContent('Bold');
      
      const iconElement = toggleElement.querySelector('svg');
      expect(iconElement).toBeInTheDocument();
    });

    it('renders with custom content', () => {
      render(
        <Toggle aria-label="Custom content toggle">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Like</span>
          </div>
        </Toggle>
      );
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveTextContent('Like');
      
      const iconElement = toggleElement.querySelector('svg');
      expect(iconElement).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('toggles with Space key', async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="Keyboard toggle" />);
      
      const toggleElement = screen.getByRole('button');
      toggleElement.focus();
      
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
      
      await user.keyboard(' ');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'true');
      
      await user.keyboard(' ');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
    });

    it('toggles with Enter key', async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="Keyboard toggle" />);
      
      const toggleElement = screen.getByRole('button');
      toggleElement.focus();
      
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
      
      await user.keyboard('{Enter}');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'true');
      
      await user.keyboard('{Enter}');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
    });

    it('is focusable with Tab key', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Previous button</button>
          <Toggle aria-label="Focusable toggle" />
          <button>Next button</button>
        </div>
      );
      
      const toggleElement = screen.getByRole('button', { name: 'Focusable toggle' });
      
      await user.tab();
      expect(screen.getByText('Previous button')).toHaveFocus();
      
      await user.tab();
      expect(toggleElement).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Next button')).toHaveFocus();
    });

    it('does not respond to keyboard when disabled', async () => {
      const onPressedChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Toggle 
          disabled 
          onPressedChange={onPressedChange} 
          aria-label="Disabled keyboard toggle"
        />
      );
      
      const toggleElement = screen.getByRole('button');
      toggleElement.focus();
      
      await user.keyboard(' ');
      await user.keyboard('{Enter}');
      
      expect(onPressedChange).not.toHaveBeenCalled();
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Toggle aria-label="Accessible toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
      expect(toggleElement).toHaveAttribute('aria-label', 'Accessible toggle');
      expect(toggleElement).toHaveAttribute('type', 'button');
    });

    it('updates aria-pressed when state changes', async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="ARIA toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveAttribute('aria-pressed', 'false');
      
      await user.click(toggleElement);
      expect(toggleElement).toHaveAttribute('aria-pressed', 'true');
    });

    it('supports aria-labelledby', () => {
      render(
        <div>
          <span id="toggle-label">Format as bold</span>
          <Toggle aria-labelledby="toggle-label" />
        </div>
      );
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveAttribute('aria-labelledby', 'toggle-label');
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Toggle aria-label="Bold toggle" aria-describedby="toggle-description" />
          <span id="toggle-description">Makes text bold</span>
        </div>
      );
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveAttribute('aria-describedby', 'toggle-description');
    });

    it('has proper focus indicators', () => {
      render(<Toggle aria-label="Focus toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('focus-visible:outline-none');
      expect(toggleElement).toHaveClass('focus-visible:ring-2');
      expect(toggleElement).toHaveClass('focus-visible:ring-ring');
      expect(toggleElement).toHaveClass('focus-visible:ring-offset-2');
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      render(<Toggle className="custom-class" aria-label="Custom toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      render(<Toggle className="custom-class" aria-label="Merged classes toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveClass('custom-class');
      expect(toggleElement).toHaveClass('inline-flex');
      expect(toggleElement).toHaveClass('items-center');
      expect(toggleElement).toHaveClass('justify-center');
    });

    it('accepts custom style prop', () => {
      render(
        <Toggle 
          style={{ backgroundColor: 'red' }} 
          aria-label="Custom style toggle"
        />
      );
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toHaveAttribute('style');
      expect(toggleElement.style.backgroundColor).toBe('red');
    });
  });

  describe('Real-world Usage Scenarios', () => {
    it('works in a toolbar context', async () => {
      const ToolbarExample = () => {
        const [formatting, setFormatting] = useState({
          bold: false,
          italic: false,
          underline: false
        });

        return (
          <div role="toolbar" aria-label="Formatting toolbar">
            <Toggle
              pressed={formatting.bold}
              onPressedChange={(pressed) => 
                setFormatting(prev => ({ ...prev, bold: pressed }))
              }
              aria-label="Bold"
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={formatting.italic}
              onPressedChange={(pressed) => 
                setFormatting(prev => ({ ...prev, italic: pressed }))
              }
              aria-label="Italic"
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={formatting.underline}
              onPressedChange={(pressed) => 
                setFormatting(prev => ({ ...prev, underline: pressed }))
              }
              aria-label="Underline"
            >
              <Underline className="h-4 w-4" />
            </Toggle>
            <div data-testid="formatting-state">
              {Object.entries(formatting)
                .filter(([_, value]) => value)
                .map(([key, _]) => key)
                .join(', ') || 'none'}
            </div>
          </div>
        );
      };

      const user = userEvent.setup();
      render(<ToolbarExample />);
      
      const boldToggle = screen.getByRole('button', { name: 'Bold' });
      const italicToggle = screen.getByRole('button', { name: 'Italic' });
      const stateDisplay = screen.getByTestId('formatting-state');
      
      expect(stateDisplay).toHaveTextContent('none');
      
      await user.click(boldToggle);
      expect(stateDisplay).toHaveTextContent('bold');
      
      await user.click(italicToggle);
      expect(stateDisplay).toHaveTextContent('bold, italic');
      
      await user.click(boldToggle);
      expect(stateDisplay).toHaveTextContent('italic');
    });

    it('works in a settings panel context', async () => {
      const SettingsPanel = () => {
        const [settings, setSettings] = useState({
          notifications: true,
          darkMode: false,
          autoSave: true
        });

        return (
          <div>
            <h2>Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <Toggle
                  pressed={settings.notifications}
                  onPressedChange={(pressed) => 
                    setSettings(prev => ({ ...prev, notifications: pressed }))
                  }
                  aria-label="Toggle notifications"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <Toggle
                  pressed={settings.darkMode}
                  onPressedChange={(pressed) => 
                    setSettings(prev => ({ ...prev, darkMode: pressed }))
                  }
                  aria-label="Toggle dark mode"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Auto Save</span>
                <Toggle
                  pressed={settings.autoSave}
                  onPressedChange={(pressed) => 
                    setSettings(prev => ({ ...prev, autoSave: pressed }))
                  }
                  aria-label="Toggle auto save"
                />
              </div>
            </div>
            <div data-testid="active-settings">
              Active: {Object.entries(settings)
                .filter(([_, value]) => value)
                .map(([key, _]) => key)
                .join(', ') || 'none'}
            </div>
          </div>
        );
      };

      const user = userEvent.setup();
      render(<SettingsPanel />);
      
      const activeSettings = screen.getByTestId('active-settings');
      expect(activeSettings).toHaveTextContent('Active: notifications, autoSave');
      
      // Toggle dark mode on
      await user.click(screen.getByLabelText('Toggle dark mode'));
      expect(activeSettings).toHaveTextContent('Active: notifications, darkMode, autoSave');
      
      // Toggle notifications off
      await user.click(screen.getByLabelText('Toggle notifications'));
      expect(activeSettings).toHaveTextContent('Active: darkMode, autoSave');
    });

    it('works with different variants and sizes in a group', () => {
      render(
        <div>
          <Toggle variant="default" size="sm" aria-label="Small default">
            <Bold className="h-3 w-3" />
          </Toggle>
          <Toggle variant="outline" size="default" aria-label="Default outline">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="default" size="lg" aria-label="Large default">
            <Underline className="h-5 w-5" />
          </Toggle>
        </div>
      );
      
      const smallToggle = screen.getByRole('button', { name: 'Small default' });
      const defaultToggle = screen.getByRole('button', { name: 'Default outline' });
      const largeToggle = screen.getByRole('button', { name: 'Large default' });
      
      expect(smallToggle).toHaveClass('h-9', 'px-2.5');
      expect(defaultToggle).toHaveClass('h-10', 'px-3', 'border');
      expect(largeToggle).toHaveClass('h-11', 'px-5');
    });
  });

  describe('Error Handling', () => {
    it('handles missing aria-label gracefully', () => {
      // This should still render but might have accessibility warnings
      render(<Toggle />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toBeInTheDocument();
    });

    it('handles undefined onPressedChange gracefully', async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="No callback toggle" />);
      
      const toggleElement = screen.getByRole('button');
      
      // Should not throw error when clicked
      await user.click(toggleElement);
      expect(toggleElement).toHaveAttribute('aria-pressed', 'true');
    });

    it('handles invalid pressed prop gracefully', () => {
      // @ts-expect-error - Testing invalid prop
      render(<Toggle pressed="invalid" aria-label="Invalid prop toggle" />);
      
      const toggleElement = screen.getByRole('button');
      expect(toggleElement).toBeInTheDocument();
    });
  });
});