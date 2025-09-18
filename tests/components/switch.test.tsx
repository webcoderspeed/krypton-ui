import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

describe('Switch Component', () => {
  describe('Basic Functionality', () => {
    it('renders switch with correct role', () => {
      render(<Switch />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders with default unchecked state', () => {
      render(<Switch />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('renders with checked state when defaultChecked is true', () => {
      render(<Switch defaultChecked />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles state when clicked', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      
      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
      
      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles state when space key is pressed', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      
      const switchElement = screen.getByRole('switch');
      switchElement.focus();
      
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      
      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
      
      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles state when enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<Switch />);
      
      const switchElement = screen.getByRole('switch');
      switchElement.focus();
      
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      
      await user.keyboard('{Enter}');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Controlled Component', () => {
    it('works as controlled component', async () => {
      const onCheckedChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={onCheckedChange} />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      
      await userEvent.click(switchElement);
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('maintains controlled state', async () => {
      const TestComponent = () => {
        const [checked, setChecked] = useState(false);
        return (
          <div>
            <Switch checked={checked} onCheckedChange={setChecked} />
            <span data-testid="status">{checked ? 'on' : 'off'}</span>
          </div>
        );
      };

      render(<TestComponent />);
      
      const switchElement = screen.getByRole('switch');
      const status = screen.getByTestId('status');
      
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      expect(status).toHaveTextContent('off');
      
      await userEvent.click(switchElement);
      
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
      expect(status).toHaveTextContent('on');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled switch correctly', () => {
      render(<Switch disabled />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
    });

    it('does not toggle when disabled and clicked', async () => {
      const onCheckedChange = vi.fn();
      render(<Switch disabled onCheckedChange={onCheckedChange} />);
      
      const switchElement = screen.getByRole('switch');
      await userEvent.click(switchElement);
      
      expect(onCheckedChange).not.toHaveBeenCalled();
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('does not respond to keyboard events when disabled', async () => {
      const onCheckedChange = vi.fn();
      render(<Switch disabled onCheckedChange={onCheckedChange} />);
      
      const switchElement = screen.getByRole('switch');
      switchElement.focus();
      
      await userEvent.keyboard(' ');
      await userEvent.keyboard('{Enter}');
      
      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Switch />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('role', 'switch');
      expect(switchElement).toHaveAttribute('aria-checked');
      expect(switchElement).toHaveAttribute('data-state');
    });

    it('supports aria-label', () => {
      render(<Switch aria-label="Toggle notifications" />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-label', 'Toggle notifications');
    });

    it('supports aria-labelledby', () => {
      render(
        <div>
          <label id="switch-label">Enable feature</label>
          <Switch aria-labelledby="switch-label" />
        </div>
      );
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-labelledby', 'switch-label');
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Switch aria-describedby="switch-description" />
          <div id="switch-description">This will enable notifications</div>
        </div>
      );
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-describedby', 'switch-description');
    });

    it('is focusable by default', () => {
      render(<Switch />);
      
      const switchElement = screen.getByRole('switch');
      switchElement.focus();
      expect(switchElement).toHaveFocus();
    });

    it('has correct disabled state attributes', () => {
      render(<Switch disabled />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<Switch className="custom-switch" />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('custom-switch');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Switch ref={ref} />);
      
      expect(ref).toHaveBeenCalled();
    });

    it('passes through data attributes', () => {
      render(<Switch data-testid="my-switch" data-custom="value" />);
      
      const switchElement = screen.getByTestId('my-switch');
      expect(switchElement).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', async () => {
      const onSubmit = vi.fn();
      
      const TestForm = () => {
        const [notifications, setNotifications] = useState(false);
        
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          onSubmit({ notifications });
        };
        
        return (
          <form onSubmit={handleSubmit}>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
              data-testid="notifications-switch"
            />
            <button type="submit">Submit</button>
          </form>
        );
      };

      render(<TestForm />);
      
      const switchElement = screen.getByTestId('notifications-switch');
      const submitButton = screen.getByText('Submit');
      
      await userEvent.click(switchElement);
      await userEvent.click(submitButton);
      
      expect(onSubmit).toHaveBeenCalledWith({ notifications: true });
    });
  });

  describe('Event Handling', () => {
    it('calls onCheckedChange with correct value', async () => {
      const onCheckedChange = vi.fn();
      render(<Switch onCheckedChange={onCheckedChange} />);
      
      const switchElement = screen.getByRole('switch');
      await userEvent.click(switchElement);
      
      expect(onCheckedChange).toHaveBeenCalledWith(true);
      expect(onCheckedChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onCheckedChange when value does not change', async () => {
      const onCheckedChange = vi.fn();
      render(<Switch checked={true} onCheckedChange={onCheckedChange} />);
      
      // Simulate external state update without user interaction
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
      
      // onCheckedChange should not be called for programmatic updates
      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid clicks correctly', async () => {
      const onCheckedChange = vi.fn();
      render(<Switch onCheckedChange={onCheckedChange} />);
      
      const switchElement = screen.getByRole('switch');
      
      // Rapid clicks
      await userEvent.click(switchElement);
      await userEvent.click(switchElement);
      await userEvent.click(switchElement);
      
      expect(onCheckedChange).toHaveBeenCalledTimes(3);
      expect(onCheckedChange).toHaveBeenNthCalledWith(1, true);
      expect(onCheckedChange).toHaveBeenNthCalledWith(2, false);
      expect(onCheckedChange).toHaveBeenNthCalledWith(3, true);
    });

    it('maintains state when re-rendered', async () => {
      const TestComponent = ({ extraProp }: { extraProp?: string }) => (
        <Switch data-testid="switch" defaultChecked />
      );
      
      const { rerender } = render(<TestComponent />);
      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
      
      // Re-render with different props
      rerender(<TestComponent extraProp="updated" />);
      
      // State should be maintained for uncontrolled component
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('handles null/undefined onCheckedChange gracefully', async () => {
      render(<Switch onCheckedChange={undefined} />);
      
      const switchElement = screen.getByRole('switch');
      
      // Should not throw error
      await userEvent.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });
  });
});

// Integration tests with Label component
describe('Switch with Label Integration', () => {
  it('works correctly with Label component', async () => {
    render(
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    );
    
    const switchElement = screen.getByRole('switch');
    const label = screen.getByText('Airplane Mode');
    
    expect(switchElement).toHaveAttribute('id', 'airplane-mode');
    expect(label).toHaveAttribute('for', 'airplane-mode');
    
    // Clicking label should toggle switch
    await userEvent.click(label);
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  it('supports complex label content', () => {
    render(
      <div className="flex items-center space-x-2">
        <Switch id="notifications" />
        <Label htmlFor="notifications" className="text-sm font-medium">
          <span>Enable notifications</span>
          <span className="text-muted-foreground block text-xs">
            Get notified about important updates
          </span>
        </Label>
      </div>
    );
    
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByText('Get notified about important updates')).toBeInTheDocument();
  });
});

// Real-world usage patterns
describe('Switch Real-world Patterns', () => {
  it('works in settings panel pattern', async () => {
    const SettingsPanel = () => {
      const [settings, setSettings] = useState({
        notifications: false,
        darkMode: true,
        autoSave: false,
      });
      
      const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
        setSettings(prev => ({ ...prev, [key]: checked }));
      };
      
      return (
        <div data-testid="settings-panel">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications</Label>
              <Switch 
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={updateSetting('notifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch 
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={updateSetting('darkMode')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save">Auto Save</Label>
              <Switch 
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={updateSetting('autoSave')}
              />
            </div>
          </div>
          <div data-testid="settings-output">
            {JSON.stringify(settings)}
          </div>
        </div>
      );
    };

    render(<SettingsPanel />);
    
    const notificationsSwitch = screen.getByLabelText('Notifications');
    const darkModeSwitch = screen.getByLabelText('Dark Mode');
    const autoSaveSwitch = screen.getByLabelText('Auto Save');
    const output = screen.getByTestId('settings-output');
    
    // Initial state
    expect(output).toHaveTextContent('{"notifications":false,"darkMode":true,"autoSave":false}');
    
    // Toggle notifications
    await userEvent.click(notificationsSwitch);
    expect(output).toHaveTextContent('{"notifications":true,"darkMode":true,"autoSave":false}');
    
    // Toggle dark mode
    await userEvent.click(darkModeSwitch);
    expect(output).toHaveTextContent('{"notifications":true,"darkMode":false,"autoSave":false}');
    
    // Toggle auto save
    await userEvent.click(autoSaveSwitch);
    expect(output).toHaveTextContent('{"notifications":true,"darkMode":false,"autoSave":true}');
  });

  it('works in feature flags pattern', async () => {
    const FeatureFlags = () => {
      const [features, setFeatures] = useState({
        betaFeatures: false,
        experimentalUI: false,
        advancedMode: false,
      });
      
      return (
        <div data-testid="feature-flags">
          <h3>Feature Flags</h3>
          {Object.entries(features).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Switch 
                id={key}
                checked={value}
                onCheckedChange={(checked) => 
                  setFeatures(prev => ({ ...prev, [key]: checked }))
                }
              />
              <Label htmlFor={key}>{key}</Label>
            </div>
          ))}
          <div data-testid="active-features">
            Active: {Object.entries(features)
              .filter(([, value]) => value)
              .map(([key]) => key)
              .join(', ') || 'None'}
          </div>
        </div>
      );
    };

    render(<FeatureFlags />);
    
    const activeFeatures = screen.getByTestId('active-features');
    expect(activeFeatures).toHaveTextContent('Active: None');
    
    // Enable beta features
    await userEvent.click(screen.getByLabelText('betaFeatures'));
    expect(activeFeatures).toHaveTextContent('Active: betaFeatures');
    
    // Enable experimental UI
    await userEvent.click(screen.getByLabelText('experimentalUI'));
    expect(activeFeatures).toHaveTextContent('Active: betaFeatures, experimentalUI');
  });
});