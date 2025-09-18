import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

describe('Card Component', () => {
  it('renders basic card correctly', () => {
    render(
      <Card>
        <CardContent>Basic card content</CardContent>
      </Card>
    );
    
    expect(screen.getByText('Basic card content')).toBeInTheDocument();
  });

  it('renders card with header', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
      </Card>
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description text')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders card with footer', () => {
    render(
      <Card>
        <CardContent>Card content</CardContent>
        <CardFooter>
          <p>Footer content</p>
        </CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });
});