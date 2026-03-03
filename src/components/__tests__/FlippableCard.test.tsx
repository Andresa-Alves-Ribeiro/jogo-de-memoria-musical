import { render, screen, fireEvent } from '@testing-library/react';
import { FlippableCard } from '../FlippableCard';
import { vi } from 'vitest';

const mockOnClick = vi.fn();

describe('FlippableCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render card content on front', () => {
    render(
      <FlippableCard
        content={1}
        isFlipped={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked and clickable', () => {
    render(
      <FlippableCard
        content={1}
        isFlipped={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );
    const card = screen.getByText('1').closest('div');
    if (card?.parentElement) {
      fireEvent.click(card.parentElement);
    }
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when card is disabled', () => {
    render(
      <FlippableCard
        content={1}
        isFlipped={true}
        isDisabled={true}
        onClick={mockOnClick}
      />
    );
    const card = screen.getByText('1').closest('div');
    if (card?.parentElement) {
      fireEvent.click(card.parentElement);
    }
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should show instrument image when disabled and image provided', () => {
    render(
      <FlippableCard
        content={1}
        isFlipped={true}
        isDisabled={true}
        image="/test/instrument.jpg"
        name="Violino"
        onClick={mockOnClick}
      />
    );
    const img = screen.getByAltText('Instrumento');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test/instrument.jpg');
    expect(screen.getByText('Violino')).toBeInTheDocument();
  });

  it('should show emoji when flipped but no image', () => {
    render(
      <FlippableCard
        content={1}
        isFlipped={true}
        isDisabled={false}
        isSelected={true}
        onClick={mockOnClick}
      />
    );
    expect(screen.getByText('🔊')).toBeInTheDocument();
  });

  it('should not call onClick when isPlaying is false', () => {
    render(
      <FlippableCard
        content={1}
        isFlipped={false}
        isDisabled={false}
        isPlaying={false}
        onClick={mockOnClick}
      />
    );
    const card = screen.getByText('1').closest('div');
    if (card?.parentElement) {
      fireEvent.click(card.parentElement);
    }
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should apply cursor-pointer when clickable and cursor-default when not', () => {
    const { rerender } = render(
      <FlippableCard
        content={1}
        isFlipped={false}
        isDisabled={false}
        isPlaying={true}
        onClick={mockOnClick}
      />
    );
    const container = screen.getByText('1').closest('.relative');
    expect(container).toHaveClass('cursor-pointer');

    rerender(
      <FlippableCard
        content={1}
        isFlipped={false}
        isDisabled={false}
        isPlaying={false}
        onClick={mockOnClick}
      />
    );
    const containerNotPlaying = screen.getByText('1').closest('.relative');
    expect(containerNotPlaying).toHaveClass('cursor-default');
  });
});
