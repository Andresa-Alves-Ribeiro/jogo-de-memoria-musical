import { render, screen } from '@testing-library/react';
import AnimatedBackground from '../AnimatedBackground';
import { vi } from 'vitest';

// Mock phosphor icons
vi.mock('@phosphor-icons/react', () => ({
  MusicNote: () => <div data-testid="music-note">MusicNote</div>,
  MusicNotes: () => <div data-testid="music-notes">MusicNotes</div>,
  MusicNoteSimple: () => <div data-testid="music-note-simple">MusicNoteSimple</div>,
  MusicNotesSimple: () => <div data-testid="music-notes-simple">MusicNotesSimple</div>,
}));

describe('AnimatedBackground', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 800, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 600, writable: true });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, writable: true });
  });

  it('should render the background container', () => {
    render(<AnimatedBackground />);
    const container = document.querySelector('.relative.w-screen.h-full.overflow-hidden');
    expect(container).toBeInTheDocument();
  });

  it('should render gradient background', () => {
    render(<AnimatedBackground />);
    const gradient = document.querySelector('.absolute.top-0.left-0.w-full.h-full');
    expect(gradient).toBeInTheDocument();
  });

  it('should render children when provided', () => {
    render(
      <AnimatedBackground>
        <div data-testid="child">Child content</div>
      </AnimatedBackground>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('should handle resize event', () => {
    render(<AnimatedBackground />);
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    window.dispatchEvent(new Event('resize'));
    expect(document.querySelector('.relative.w-screen.h-full.overflow-hidden')).toBeInTheDocument();
  });
});
