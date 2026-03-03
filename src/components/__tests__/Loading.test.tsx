import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  it('should render default loading text', () => {
    render(<Loading />);
    expect(screen.getByText('CARREGANDO...')).toBeInTheDocument();
  });

  it('should render custom loading text', () => {
    render(<Loading text="Aguarde..." />);
    expect(screen.getByText('Aguarde...')).toBeInTheDocument();
  });
});
