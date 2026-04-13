import { render, screen } from '@testing-library/react';
import FightersPage from '@/app/fighters/page';

describe('FightersPage', () => {
  it('renders heading and search', () => {
    render(<FightersPage />);
    expect(screen.getByText('Fighters')).toBeInTheDocument();
    expect(screen.getByLabelText('Search fighters')).toBeInTheDocument();
  });
});
