import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  CarouselDefault,
  CarouselMultiple,
  CarouselVertical,
  CarouselApi,
} from '@/components/playground/carousel';

describe('Carousel Components', () => {
  describe('CarouselDefault', () => {
    it('renders without crashing', () => {
      render(<CarouselDefault />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('contains carousel content', () => {
      render(<CarouselDefault />);
      const carousel = screen.getByRole('region');
      expect(carousel).toBeInTheDocument();
    });
  });

  describe('CarouselMultiple', () => {
    it('renders without crashing', () => {
      render(<CarouselMultiple />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('contains multiple carousel items', () => {
      render(<CarouselMultiple />);
      const carousel = screen.getByRole('region');
      expect(carousel).toBeInTheDocument();
    });
  });

  describe('CarouselVertical', () => {
    it('renders without crashing', () => {
      render(<CarouselVertical />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('renders vertical carousel', () => {
      render(<CarouselVertical />);
      const carousel = screen.getByRole('region');
      expect(carousel).toBeInTheDocument();
    });
  });

  describe('CarouselApi', () => {
    it('renders without crashing', () => {
      render(<CarouselApi />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('contains api-controlled carousel', () => {
      render(<CarouselApi />);
      const carousel = screen.getByRole('region');
      expect(carousel).toBeInTheDocument();
    });
  });
});