import { Product } from "@/types/product";
import { fetchProducts } from "@/utils/api";

describe('fetchProducts', () => {
  it('should fetch products correctly', async () => {
    const mockApiResponse: Product[] = [
        {
          id: 1,
          title: 'Product 1',
          description: 'Description for Product 1',
          price: 19.99,
          rating: 4.5,
          image: 'product1.jpg',
        },
        {
          id: 2,
          title: 'Product 2',
          description: 'Description for Product 2',
          price: 29.99,
          rating: 3.8,
          image: 'product2.jpg',
        }
      ];

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockApiResponse),
    });

    const products = await fetchProducts(0);

    expect(products).toHaveLength(2);
    expect(products[0].title).toBe('Product 1');
    expect(products[1].description).toBe('Description for Product 2');

    expect(fetch).toHaveBeenCalledWith(`https://alec-litho.github.io/data`);
  });
});