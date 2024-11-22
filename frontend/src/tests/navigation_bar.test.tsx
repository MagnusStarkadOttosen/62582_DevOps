import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/navigation_bar';

// Mocking the navigation hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('NavigationBar', () => {
  const mockNavigate = jest.fn();

  // Reset mock before each test
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  // Tests the rendering
  it('renders Frontpage and Basket buttons', () => {
    render(<NavigationBar />);

    expect(screen.getByText('Frontpage')).toBeInTheDocument();
    expect(screen.getByText('Basket')).toBeInTheDocument();
  });

  // Tests the "Home" button
  it('navigates to the frontpage when Frontpage button is clicked', () => {
    render(<NavigationBar />);

    const frontpageButton = screen.getByText('Frontpage');
    fireEvent.click(frontpageButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  // Test the "Basket" button
  it('navigates to the basket when Basket button is clicked', () => {
    render(<NavigationBar />);

    const basketButton = screen.getByText('Basket');
    fireEvent.click(basketButton);

    expect(mockNavigate).toHaveBeenCalledWith('/basket');
  });
});
