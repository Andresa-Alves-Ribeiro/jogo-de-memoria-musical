import { render, screen } from '@testing-library/react';
import AnimatedTitle from '../AnimatedTitle';

describe('AnimatedTitle', () => {
  it('should render the text', () => {
    const { container } = render(<AnimatedTitle text="JOGO" />);
    expect(container.querySelector('h1')?.textContent).toBe('JOGO');
  });

  it('should apply custom className', () => {
    const { container } = render(<AnimatedTitle text="Test" className="custom-class" />);
    const h1 = container.querySelector('h1');
    expect(h1).toHaveClass('custom-class');
  });
});
