import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaymentPage from '../views/PaymentPage';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('PaymentPage Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);
    });

    it('renders PaymentPage component with all sections', () => {
        render(
            <MemoryRouter>
                <PaymentPage />
            </MemoryRouter>
        );

        // Check for form sections
        expect(screen.getByText(/Billing Information/i)).toBeInTheDocument();
        expect(screen.getByText(/Billing Address/i)).toBeInTheDocument();
        expect(screen.getByText(/Payment Method/i)).toBeInTheDocument();

        // Check for specific fields by placeholder
        expect(screen.getByPlaceholderText(/Hans Hansen/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/hans@hansen.com/i)).toBeInTheDocument();

        // Use `getAllByPlaceholderText` and filter by `name`
        const phoneNumberInput = screen
            .getAllByPlaceholderText(/xxxxxxxx/i)
            .find((input) => input.getAttribute('name') === 'phoneNumber');

        expect(phoneNumberInput).toBeInTheDocument();
    });

    it('updates billing information on user input', () => {
        render(
            <MemoryRouter>
                <PaymentPage />
            </MemoryRouter>
        );

        // Simulate user typing
        fireEvent.change(screen.getByPlaceholderText(/Hans Hansen/i), { target: { value: 'Anders Andersen' } });
        fireEvent.change(screen.getByPlaceholderText(/hans@hansen.com/i), { target: { value: 'anders@andersen.com' } });

        expect(screen.getByPlaceholderText(/Hans Hansen/i)).toHaveValue('Anders Andersen');
        expect(screen.getByPlaceholderText(/hans@hansen.com/i)).toHaveValue('anders@andersen.com');
    });

    it('switches payment methods correctly', () => {
        render(
            <MemoryRouter>
                <PaymentPage />
            </MemoryRouter>
        );

        // Verify default to Credit Card
        expect(screen.getByPlaceholderText(/xxxx xxxx xxxx xxxx/i)).toBeInTheDocument();

        // Switch to MobilePay
        fireEvent.click(screen.getByLabelText(/MobilePay/i));

        // Credit Card fields should disappear
        expect(screen.queryByPlaceholderText(/xxxx xxxx xxxx xxxx/i)).not.toBeInTheDocument();

        // Find MobilePay input by filtering
        const mobilePayInput = screen
            .getAllByPlaceholderText(/xxxxxxxx/i)
            .find((input) => input.getAttribute('name') === 'mobilePayPhoneNumber');
        expect(mobilePayInput).toBeInTheDocument();
    });

    it('validates form submission and logs data', () => {
        render(
            <MemoryRouter>
                <PaymentPage />
            </MemoryRouter>
        );

        // Fill in required fields
        fireEvent.change(screen.getByPlaceholderText(/Hans Hansen/i), { target: { value: 'Anders Andersen' } });
        fireEvent.change(screen.getByPlaceholderText(/hans@hansen.com/i), { target: { value: 'Anders@andersen.com' } });

        // Find phoneNumber input by filtering
        const phoneNumberInput = screen
            .getAllByPlaceholderText(/xxxxxxxx/i)
            .find((input) => input.getAttribute('name') === 'phoneNumber');

        fireEvent.change(phoneNumberInput!, { target: { value: '12345678' } });

        // Submit form
        fireEvent.click(screen.getByText(/Proceed/i));

        // Verify navigation
        expect(mockNavigate).toHaveBeenCalledWith('/receipt', expect.objectContaining({
            state: expect.objectContaining({
                billingInfo: expect.any(Object),
                paymentMethod: 'creditCard',
                paymentDetails: expect.any(Object),
            }),
        }));
    });
});
