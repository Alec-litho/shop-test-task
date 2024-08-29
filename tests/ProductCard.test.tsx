import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductCard from '@/components/ProductCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Product 1',
    description: 'This is a product description.',
    price: 99.99,
    currency: 'USD',
    rating: 4.5,
    image: 'product1.jpg',
  };

  it('renders product information correctly', () => {
    const { getByAltText, getByText } = render(<ProductCard product={product} />);

    expect(getByAltText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('This is a product description.')).toBeInTheDocument();
    expect(getByText('$99.99')).toBeInTheDocument();
    expect(getByText('Rating: 4.5')).toBeInTheDocument();
  });
});
