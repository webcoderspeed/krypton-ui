import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Settings, Bell } from 'lucide-react';

// Test wrapper component for controlled tabs
function ControlledTabsWrapper() {
  const [activeTab, setActiveTab] = useState('account');
  
  return (
    <>
      <Button onClick={() => setActiveTab('password')}>Switch to Password</Button>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>Account content</div>
        </TabsContent>
        <TabsContent value="password">
          <div>Password content</div>
        </TabsContent>
      </Tabs>
    </>
  );
}

// Test wrapper component for tabs with form
function TabsWithFormWrapper() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
            <Button>Save password</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// Test wrapper component for tabs with icons
function TabsWithIconsWrapper() {
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">
          <User className="h-4 w-4 mr-2" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Profile content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
      <TabsContent value="notifications">Notifications content</TabsContent>
    </Tabs>
  );
}

// Test wrapper component for tabs with badges
function TabsWithBadgesWrapper() {
  return (
    <Tabs defaultValue="inbox">
      <TabsList>
        <TabsTrigger value="inbox">
          Inbox
          <Badge variant="secondary" className="ml-2">12</Badge>
        </TabsTrigger>
        <TabsTrigger value="sent">
          Sent
          <Badge variant="secondary" className="ml-2">3</Badge>
        </TabsTrigger>
        <TabsTrigger value="drafts">
          Drafts
          <Badge variant="secondary" className="ml-2">1</Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">Inbox content</TabsContent>
      <TabsContent value="sent">Sent content</TabsContent>
      <TabsContent value="drafts">Drafts content</TabsContent>
    </Tabs>
  );
}

// Test wrapper component for loading state
function TabsLoadingWrapper() {
  const [loading, setLoading] = useState(false);
  
  return (
    <>
      <Button onClick={() => setLoading(!loading)}>Toggle Loading</Button>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          {loading ? 'Loading...' : 'Tab 1 content'}
        </TabsContent>
        <TabsContent value="tab2">
          {loading ? 'Loading...' : 'Tab 2 content'}
        </TabsContent>
      </Tabs>
    </>
  );
}

// Test wrapper component for disabled tabs
function TabsDisabledWrapper() {
  return (
    <Tabs defaultValue="enabled">
      <TabsList>
        <TabsTrigger value="enabled">Enabled</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="enabled">Enabled content</TabsContent>
      <TabsContent value="disabled">Disabled content</TabsContent>
      <TabsContent value="another">Another content</TabsContent>
    </Tabs>
  );
}

describe('Tabs Component', () => {
  describe('Basic Tabs', () => {
    it('renders tabs with triggers and content', () => {
      render(
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      );
      
      expect(screen.getByText('Account')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByText('Account content')).toBeInTheDocument();
      expect(screen.queryByText('Password content')).not.toBeInTheDocument();
    });
    
    it('switches content when clicking different triggers', async () => {
      const user = userEvent.setup();
      
      render(
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      );
      
      expect(screen.getByText('Account content')).toBeInTheDocument();
      expect(screen.queryByText('Password content')).not.toBeInTheDocument();
      
      await user.click(screen.getByText('Password'));
      
      expect(screen.queryByText('Account content')).not.toBeInTheDocument();
      expect(screen.getByText('Password content')).toBeInTheDocument();
    });
    
    it('supports custom className', () => {
      const { container } = render(
        <Tabs defaultValue="account" className="custom-tabs">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Content</TabsContent>
        </Tabs>
      );
      
      expect(container.firstChild).toHaveClass('custom-tabs');
    });
    
    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
          <TabsContent value="settings">Settings content</TabsContent>
        </Tabs>
      );
      
      const accountTrigger = screen.getByText('Account');
      accountTrigger.focus();
      
      // Navigate with arrow keys
      await user.keyboard('{ArrowRight}');
      expect(screen.getByText('Password content')).toBeInTheDocument();
      
      await user.keyboard('{ArrowRight}');
      expect(screen.getByText('Settings content')).toBeInTheDocument();
      
      await user.keyboard('{ArrowLeft}');
      expect(screen.getByText('Password content')).toBeInTheDocument();
    });
  });
  
  describe('Controlled Tabs', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      
      render(<ControlledTabsWrapper />);
      
      expect(screen.getByText('Account content')).toBeInTheDocument();
      expect(screen.queryByText('Password content')).not.toBeInTheDocument();
      
      await user.click(screen.getByText('Switch to Password'));
      
      expect(screen.queryByText('Account content')).not.toBeInTheDocument();
      expect(screen.getByText('Password content')).toBeInTheDocument();
    });
    
    it('calls onValueChange when tab changes', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      
      render(
        <Tabs defaultValue="account" onValueChange={onValueChange}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      );
      
      await user.click(screen.getByText('Password'));
      
      expect(onValueChange).toHaveBeenCalledWith('password');
    });
  });
  
  describe('Tabs with Form', () => {
    it('renders form elements correctly', () => {
      render(<TabsWithFormWrapper />);
      
      expect(screen.getByRole('tab', { name: 'Account' })).toBeInTheDocument();
      expect(screen.getByText('Make changes to your account here.')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByText('Save changes')).toBeInTheDocument();
    });
    
    it('handles form input changes', async () => {
      const user = userEvent.setup();
      
      render(<TabsWithFormWrapper />);
      
      const nameInput = screen.getByLabelText('Name');
      await user.type(nameInput, 'John Doe');
      
      expect(nameInput).toHaveValue('John Doe');
    });
    
    it('switches between form tabs', async () => {
      const user = userEvent.setup();
      
      render(<TabsWithFormWrapper />);
      
      expect(screen.getByText('Make changes to your account here.')).toBeInTheDocument();
      
      await user.click(screen.getByText('Password'));
      
      expect(screen.getByText('Change your password here.')).toBeInTheDocument();
      expect(screen.getByLabelText('Current password')).toBeInTheDocument();
      expect(screen.getByLabelText('New password')).toBeInTheDocument();
    });
  });
  
  describe('Tabs with Icons', () => {
    it('renders tabs with icons', () => {
      render(<TabsWithIconsWrapper />);
      
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      
      // Check if icons are rendered (they should be in the DOM)
      const profileTab = screen.getByText('Profile').closest('button');
      expect(profileTab).toBeInTheDocument();
    });
    
    it('switches between icon tabs', async () => {
      const user = userEvent.setup();
      
      render(<TabsWithIconsWrapper />);
      
      expect(screen.getByText('Profile content')).toBeInTheDocument();
      
      await user.click(screen.getByText('Settings'));
      expect(screen.getByText('Settings content')).toBeInTheDocument();
      
      await user.click(screen.getByText('Notifications'));
      expect(screen.getByText('Notifications content')).toBeInTheDocument();
    });
  });
  
  describe('Tabs with Badges', () => {
    it('renders tabs with badges', () => {
      render(<TabsWithBadgesWrapper />);
      
      expect(screen.getByText('Inbox')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('Sent')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Drafts')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });
    
    it('switches between badge tabs', async () => {
      const user = userEvent.setup();
      
      render(<TabsWithBadgesWrapper />);
      
      expect(screen.getByText('Inbox content')).toBeInTheDocument();
      
      await user.click(screen.getByText('Sent'));
      expect(screen.getByText('Sent content')).toBeInTheDocument();
      
      await user.click(screen.getByText('Drafts'));
      expect(screen.getByText('Drafts content')).toBeInTheDocument();
    });
  });
  
  describe('Loading State', () => {
    it('handles loading state correctly', async () => {
      const user = userEvent.setup();
      
      render(<TabsLoadingWrapper />);
      
      expect(screen.getByText('Tab 1 content')).toBeInTheDocument();
      
      await user.click(screen.getByText('Toggle Loading'));
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      
      // Check if tabs are disabled during loading
      const tab1 = screen.getByText('Tab 1').closest('button');
      const tab2 = screen.getByText('Tab 2').closest('button');
      
      expect(tab1).toBeDisabled();
      expect(tab2).toBeDisabled();
    });
  });
  
  describe('Disabled Tabs', () => {
    it('renders disabled tabs correctly', () => {
      render(<TabsDisabledWrapper />);
      
      const enabledTab = screen.getByText('Enabled').closest('button');
      const disabledTab = screen.getByText('Disabled').closest('button');
      const anotherTab = screen.getByText('Another').closest('button');
      
      expect(enabledTab).not.toBeDisabled();
      expect(disabledTab).toBeDisabled();
      expect(anotherTab).not.toBeDisabled();
    });
    
    it('prevents interaction with disabled tabs', async () => {
      const user = userEvent.setup();
      
      render(<TabsDisabledWrapper />);
      
      expect(screen.getByText('Enabled content')).toBeInTheDocument();
      
      // Try to click disabled tab
      await user.click(screen.getByText('Disabled'));
      
      // Should still show enabled content
      expect(screen.getByText('Enabled content')).toBeInTheDocument();
      expect(screen.queryByText('Disabled content')).not.toBeInTheDocument();
    });
    
    it('allows interaction with enabled tabs', async () => {
      const user = userEvent.setup();
      
      render(<TabsDisabledWrapper />);
      
      expect(screen.getByText('Enabled content')).toBeInTheDocument();
      
      await user.click(screen.getByText('Another'));
      
      expect(screen.queryByText('Enabled content')).not.toBeInTheDocument();
      expect(screen.getByText('Another content')).toBeInTheDocument();
    });
  });
  
  describe('Vertical Orientation', () => {
    it('renders vertical tabs correctly', () => {
      render(
        <Tabs defaultValue="account" orientation="vertical">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      );
      
      expect(screen.getByText('Account')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByText('Account content')).toBeInTheDocument();
    });
    
    it('supports keyboard navigation in vertical mode', async () => {
      const user = userEvent.setup();
      
      render(
        <Tabs defaultValue="account" orientation="vertical">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      );
      
      const accountTrigger = screen.getByText('Account');
      accountTrigger.focus();
      
      // In vertical mode, should use ArrowDown/ArrowUp
      await user.keyboard('{ArrowDown}');
      expect(screen.getByText('Password content')).toBeInTheDocument();
      
      await user.keyboard('{ArrowUp}');
      expect(screen.getByText('Account content')).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      );
      
      const tabsList = screen.getByRole('tablist');
      const accountTab = screen.getByRole('tab', { name: 'Account' });
      const passwordTab = screen.getByRole('tab', { name: 'Password' });
      const accountPanel = screen.getByRole('tabpanel');
      
      expect(tabsList).toBeInTheDocument();
      expect(accountTab).toHaveAttribute('aria-selected', 'true');
      expect(passwordTab).toHaveAttribute('aria-selected', 'false');
      expect(accountPanel).toBeInTheDocument();
    });
    
    it('updates ARIA attributes when tab changes', async () => {
      const user = userEvent.setup();
      
      render(
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      );
      
      const accountTab = screen.getByRole('tab', { name: 'Account' });
      const passwordTab = screen.getByRole('tab', { name: 'Password' });
      
      expect(accountTab).toHaveAttribute('aria-selected', 'true');
      expect(passwordTab).toHaveAttribute('aria-selected', 'false');
      
      await user.click(passwordTab);
      
      expect(accountTab).toHaveAttribute('aria-selected', 'false');
      expect(passwordTab).toHaveAttribute('aria-selected', 'true');
    });
    
    it('supports focus management', async () => {
      const user = userEvent.setup();
      
      render(
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      );
      
      const accountTab = screen.getByRole('tab', { name: 'Account' });
      
      await user.tab();
      expect(accountTab).toHaveFocus();
    });
  });
});