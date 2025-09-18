import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchableSelect from '@/components/playground/select/searchable-select';

describe('SearchableSelect Component', () => {
  describe('Initial Render', () => {
    it('renders with correct label and placeholder', () => {
      render(<SearchableSelect />);
      
      expect(screen.getByText('Country (Searchable)')).toBeInTheDocument();
      expect(screen.getByText('Search and select country')).toBeInTheDocument();
    });

    it('renders select trigger as combobox', () => {
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('does not show selected country text initially', () => {
      render(<SearchableSelect />);
      
      expect(screen.queryByText(/Selected:/)).not.toBeInTheDocument();
    });
  });

  describe('Select Interaction', () => {
    it('opens dropdown when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search countries...')).toBeInTheDocument();
      });
    });

    it('displays all countries initially when opened', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('United States')).toBeInTheDocument();
        expect(screen.getByText('Canada')).toBeInTheDocument();
        expect(screen.getByText('India')).toBeInTheDocument();
        expect(screen.getByText('Australia')).toBeInTheDocument();
      });
    });

    it('selects a country when clicked', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Canada')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Canada'));
      
      await waitFor(() => {
        expect(screen.getByText('Selected: Canada')).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('filters countries based on search input', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      await user.type(searchInput, 'united');
      
      await waitFor(() => {
        expect(screen.getByText('United States')).toBeInTheDocument();
        expect(screen.getByText('United Kingdom')).toBeInTheDocument();
        expect(screen.queryByText('Canada')).not.toBeInTheDocument();
      });
    });

    it('performs case-insensitive search', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      await user.type(searchInput, 'INDIA');
      
      await waitFor(() => {
        expect(screen.getByText('India')).toBeInTheDocument();
        expect(screen.queryByText('Canada')).not.toBeInTheDocument();
      });
    });

    it('shows partial matches', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      await user.type(searchInput, 'stan');
      
      await waitFor(() => {
        expect(screen.getByText('Afghanistan')).toBeInTheDocument();
        expect(screen.getByText('Pakistan')).toBeInTheDocument();
        expect(screen.queryByText('India')).not.toBeInTheDocument();
      });
    });

    it('shows "No countries found" when search has no results', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      await user.type(searchInput, 'xyz123');
      
      await waitFor(() => {
        expect(screen.getByText('No countries found')).toBeInTheDocument();
        expect(screen.queryByText('United States')).not.toBeInTheDocument();
      });
    });

    it('clears search and shows all countries when search is cleared', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      await user.type(searchInput, 'united');
      
      await waitFor(() => {
        expect(screen.queryByText('Canada')).not.toBeInTheDocument();
      });
      
      await user.clear(searchInput);
      
      await waitFor(() => {
        expect(screen.getByText('Canada')).toBeInTheDocument();
        expect(screen.getByText('United States')).toBeInTheDocument();
      });
    });
  });

  describe('Selection and Display', () => {
    it('displays selected country with correct format', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Australia')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Australia'));
      
      await waitFor(() => {
        expect(screen.getByText('Selected: Australia')).toBeInTheDocument();
      });
    });

    it('updates selection when different country is chosen', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      
      // Select first country
      await user.click(trigger);
      await waitFor(() => {
        expect(screen.getByText('Canada')).toBeInTheDocument();
      });
      await user.click(screen.getByText('Canada'));
      
      await waitFor(() => {
        expect(screen.getByText('Selected: Canada')).toBeInTheDocument();
      });
      
      // Select different country
      await user.click(trigger);
      await waitFor(() => {
        expect(screen.getByText('India')).toBeInTheDocument();
      });
      await user.click(screen.getByText('India'));
      
      await waitFor(() => {
        expect(screen.getByText('Selected: India')).toBeInTheDocument();
        expect(screen.queryByText('Selected: Canada')).not.toBeInTheDocument();
      });
    });

    it('can select country after searching', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      await user.type(searchInput, 'japan');
      
      await waitFor(() => {
        expect(screen.getByText('Japan')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Japan'));
      
      await waitFor(() => {
        expect(screen.getByText('Selected: Japan')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has accessible label', () => {
      render(<SearchableSelect />);
      
      expect(screen.getByText('Country (Searchable)')).toBeInTheDocument();
    });

    it('search input has proper placeholder', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('placeholder', 'Search countries...');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty search gracefully', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      await user.type(searchInput, '   ');
      
      await waitFor(() => {
        // Whitespace search shows "No countries found"
        expect(screen.getByText('No countries found')).toBeInTheDocument();
      });
    });

    it('handles dropdown reopening correctly', async () => {
      const user = userEvent.setup();
      render(<SearchableSelect />);
      
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText('Search countries...');
      await user.type(searchInput, 'united');
      
      // Close dropdown by pressing escape
      await user.keyboard('{Escape}');
      
      // Reopen dropdown
      await user.click(trigger);
      
      await waitFor(() => {
        const reopenedSearchInput = screen.getByPlaceholderText('Search countries...');
        expect(reopenedSearchInput).toBeInTheDocument();
      });
    });
  });
});