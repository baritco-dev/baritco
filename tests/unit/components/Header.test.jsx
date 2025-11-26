import { render, screen } from '@testing-library/react';
import Header from '../../../components/Header';

describe('Header Component', () => {
  test('renders logo and navigation links', () => {
    render(<Header />);
    expect(screen.getByText(/باریتکو/i)).toBeInTheDocument();
    expect(screen.getByText(/محصولات/i)).toBeInTheDocument();
    expect(screen.getByText(/آگهی‌ها/i)).toBeInTheDocument();
  });
});