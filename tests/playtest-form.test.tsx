import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlaytestForm } from '@/components/PlaytestForm';

describe('PlaytestForm', () => {
  it('shows validation error for blank name after submit', async () => {
    render(<PlaytestForm />);
    await userEvent.click(screen.getByRole('button', { name: /claim your slot/i }));
    expect(await screen.findByText(/Name required/i)).toBeInTheDocument();
  });
});
