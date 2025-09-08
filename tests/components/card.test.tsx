import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders card with all components', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="card-header">
            <CardTitle data-testid="card-title">Test Title</CardTitle>
            <CardDescription data-testid="card-description">
              Test Description
            </CardDescription>
          </CardHeader>
          <CardContent data-testid="card-content">
            <p>Test Content</p>
          </CardContent>
          <CardFooter data-testid="card-footer">
            <Button>Test Button</Button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-header')).toBeInTheDocument();
      expect(screen.getByTestId('card-title')).toBeInTheDocument();
      expect(screen.getByTestId('card-description')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    });

    it('renders card with minimal content', () => {
      render(
        <Card data-testid="minimal-card">
          <CardContent>
            <p>Minimal content</p>
          </CardContent>
        </Card>
      );

      expect(screen.getByTestId('minimal-card')).toBeInTheDocument();
      expect(screen.getByText('Minimal content')).toBeInTheDocument();
    });

    it('renders card with only header', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Header Only</CardTitle>
          </CardHeader>
        </Card>
      );

      expect(screen.getByText('Header Only')).toBeInTheDocument();
    });

    it('renders card with only footer', () => {
      render(
        <Card>
          <CardFooter>
            <Button>Footer Only</Button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText('Footer Only')).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('displays title text correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>My Card Title</CardTitle>
          </CardHeader>
        </Card>
      );

      expect(screen.getByText('My Card Title')).toBeInTheDocument();
    });

    it('displays description text correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>This is a card description</CardDescription>
          </CardHeader>
        </Card>
      );

      expect(screen.getByText('This is a card description')).toBeInTheDocument();
    });

    it('displays content correctly', () => {
      render(
        <Card>
          <CardContent>
            <p>This is the main content of the card</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </CardContent>
        </Card>
      );

      expect(screen.getByText('This is the main content of the card')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('displays footer content correctly', () => {
      render(
        <Card>
          <CardFooter>
            <Button>Primary Action</Button>
            <Button variant="outline">Secondary Action</Button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText('Primary Action')).toBeInTheDocument();
      expect(screen.getByText('Secondary Action')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('applies custom className to Card', () => {
      render(
        <Card className="custom-card-class" data-testid="card">
          <CardContent>Content</CardContent>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card-class');
    });

    it('applies custom className to CardHeader', () => {
      render(
        <Card>
          <CardHeader className="custom-header-class" data-testid="header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      );

      const header = screen.getByTestId('header');
      expect(header).toHaveClass('custom-header-class');
    });

    it('applies custom className to CardTitle', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle className="custom-title-class" data-testid="title">
              Title
            </CardTitle>
          </CardHeader>
        </Card>
      );

      const title = screen.getByTestId('title');
      expect(title).toHaveClass('custom-title-class');
    });

    it('applies custom className to CardDescription', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription className="custom-desc-class" data-testid="description">
              Description
            </CardDescription>
          </CardHeader>
        </Card>
      );

      const description = screen.getByTestId('description');
      expect(description).toHaveClass('custom-desc-class');
    });

    it('applies custom className to CardContent', () => {
      render(
        <Card>
          <CardContent className="custom-content-class" data-testid="content">
            Content
          </CardContent>
        </Card>
      );

      const content = screen.getByTestId('content');
      expect(content).toHaveClass('custom-content-class');
    });

    it('applies custom className to CardFooter', () => {
      render(
        <Card>
          <CardFooter className="custom-footer-class" data-testid="footer">
            Footer
          </CardFooter>
        </Card>
      );

      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('custom-footer-class');
    });

    it('supports custom styles', () => {
      render(
        <Card
          style={{ backgroundColor: 'rgb(255, 0, 0)', color: 'rgb(255, 255, 255)' }}
          data-testid="styled-card"
        >
          <CardContent>Styled content</CardContent>
        </Card>
      );

      const card = screen.getByTestId('styled-card');
      expect(card).toHaveStyle('background-color: rgb(255, 0, 0)');
      expect(card).toHaveStyle('color: rgb(255, 255, 255)');
    });

    it('supports data attributes', () => {
      render(
        <Card data-testid="card" data-custom="custom-value">
          <CardContent>Content</CardContent>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-custom', 'custom-value');
    });

    it('supports aria attributes', () => {
      render(
        <Card aria-label="Product card" data-testid="card">
          <CardContent>Content</CardContent>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('aria-label', 'Product card');
    });
  });

  describe('Integration', () => {
    it('works with interactive elements', () => {
      const handleClick = vi.fn();
      
      render(
        <Card>
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card with interactive elements</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick}>Click Me</Button>
          </CardFooter>
        </Card>
      );

      const button = screen.getByText('Click Me');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('works with form elements', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Form Card</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <input type="text" placeholder="Enter text" />
              <textarea placeholder="Enter description" />
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('works with nested components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Nested Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Card>
                <CardContent>
                  <p>Nested card content</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      );

      expect(screen.getByText('Nested Components')).toBeInTheDocument();
      expect(screen.getByText('Nested card content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Accessible Card</CardTitle>
            <CardDescription data-testid="description">
              This card is accessible
            </CardDescription>
          </CardHeader>
          <CardContent data-testid="content">
            <p>Accessible content</p>
          </CardContent>
          <CardFooter data-testid="footer">
            <Button>Accessible Action</Button>
          </CardFooter>
        </Card>
      );

      const card = screen.getByTestId('card');
      const header = screen.getByTestId('header');
      const title = screen.getByTestId('title');
      const description = screen.getByTestId('description');
      const content = screen.getByTestId('content');
      const footer = screen.getByTestId('footer');

      expect(card.tagName).toBe('DIV');
      expect(header.tagName).toBe('DIV');
      expect(title.tagName).toBe('DIV');
      expect(description.tagName).toBe('DIV');
      expect(content.tagName).toBe('DIV');
      expect(footer.tagName).toBe('DIV');
    });

    it('supports screen reader navigation', () => {
      render(
        <Card role="article" aria-labelledby="card-title">
          <CardHeader>
            <CardTitle id="card-title">Article Title</CardTitle>
            <CardDescription>Article description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Article content</p>
          </CardContent>
        </Card>
      );

      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title');
      expect(screen.getByText('Article Title')).toHaveAttribute('id', 'card-title');
    });

    it('maintains focus management', () => {
      render(
        <Card>
          <CardContent>
            <Button>First Button</Button>
            <Button>Second Button</Button>
          </CardContent>
        </Card>
      );

      const firstButton = screen.getByText('First Button');
      const secondButton = screen.getByText('Second Button');

      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);

      secondButton.focus();
      expect(document.activeElement).toBe(secondButton);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty card', () => {
      render(<Card data-testid="empty-card" />);
      
      const card = screen.getByTestId('empty-card');
      expect(card).toBeInTheDocument();
      expect(card).toBeEmptyDOMElement();
    });

    it('handles very long content', () => {
      const longText = 'A'.repeat(1000);
      
      render(
        <Card>
          <CardContent data-testid="long-content">
            <p>{longText}</p>
          </CardContent>
        </Card>
      );

      const content = screen.getByTestId('long-content');
      expect(content).toBeInTheDocument();
      expect(content.textContent).toContain(longText);
    });

    it('handles special characters in content', () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:",./<>?`~';
      
      render(
        <Card>
          <CardTitle>{specialText}</CardTitle>
          <CardContent>
            <p>{specialText}</p>
          </CardContent>
        </Card>
      );

      expect(screen.getAllByText(specialText)).toHaveLength(2);
    });

    it('handles multiple cards in container', () => {
      render(
        <div>
          <Card data-testid="card-1">
            <CardTitle>Card 1</CardTitle>
          </Card>
          <Card data-testid="card-2">
            <CardTitle>Card 2</CardTitle>
          </Card>
          <Card data-testid="card-3">
            <CardTitle>Card 3</CardTitle>
          </Card>
        </div>
      );

      expect(screen.getByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByTestId('card-2')).toBeInTheDocument();
      expect(screen.getByTestId('card-3')).toBeInTheDocument();
      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
      expect(screen.getByText('Card 3')).toBeInTheDocument();
    });

    it('handles dynamic content updates', () => {
      const { rerender } = render(
        <Card>
          <CardTitle>Initial Title</CardTitle>
          <CardContent>
            <p>Initial content</p>
          </CardContent>
        </Card>
      );

      expect(screen.getByText('Initial Title')).toBeInTheDocument();
      expect(screen.getByText('Initial content')).toBeInTheDocument();

      rerender(
        <Card>
          <CardTitle>Updated Title</CardTitle>
          <CardContent>
            <p>Updated content</p>
          </CardContent>
        </Card>
      );

      expect(screen.getByText('Updated Title')).toBeInTheDocument();
      expect(screen.getByText('Updated content')).toBeInTheDocument();
      expect(screen.queryByText('Initial Title')).not.toBeInTheDocument();
      expect(screen.queryByText('Initial content')).not.toBeInTheDocument();
    });
  });
});