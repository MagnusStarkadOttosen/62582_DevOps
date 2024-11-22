import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductPage1 from '../views/ProductPage1';
import { useCart } from "../context/CartContext";
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// useCart and useNavigate
jest.mock('../context/CartContext', () => ({
    useCart: jest.fn(), }));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '1' }), // Assuming product ID '1' for testing
    useNavigate: jest.fn(),
}));

describe('ProductPage1 Component', () => {
    const mockAddToCart = jest.fn();
    const mockNavigate = jest.fn();

    const mockProduct = {
        id: 1,
        title: 'Test Product',
        description: 'A great product for testing.',
        price: 100,
        thumbnail: 'test-thumbnail.jpg',
        discountPercentage: 10,
    };

    beforeEach(() => {
        (useCart as jest.Mock).mockReturnValue({
            addToCart: mockAddToCart,
        });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders product details correctly', () => {
        render(
            <BrowserRouter>
                <ProductPage1 products={[mockProduct]} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('A great product for testing.')).toBeInTheDocument();
        expect(screen.getByText('100,-')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'test-thumbnail.jpg');
    });

    it('shows "Product not found" when product does not exist', () => {
        render(
            <BrowserRouter>
                <ProductPage1 products={[]} />
            </BrowserRouter>
        );

        expect(screen.getByText('Product not found')).toBeInTheDocument();
    });

    it('allows quantity selection and updates state correctly', () => {
        render(
            <BrowserRouter>
                <ProductPage1 products={[mockProduct]} />
            </BrowserRouter>
        );

        const quantitySelect = screen.getByLabelText('Antal:');
        fireEvent.change(quantitySelect, { target: { value: '3' } });

        expect(quantitySelect).toHaveValue('3');
    });

    it('adds product to cart and navigates to basket page when "Add to Cart" is clicked', () => {
        render(
            <BrowserRouter>
                <ProductPage1 products={[mockProduct]} />
            </BrowserRouter>
        );

        const addToCartButton = screen.getByText('Læg i Kurv');
        fireEvent.click(addToCartButton);

        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
        expect(mockNavigate).toHaveBeenCalledWith('/basket');
    });
});
