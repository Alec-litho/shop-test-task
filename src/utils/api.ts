import { Product } from "@/types/product";

export async function fetchProducts(page: number = 0): Promise<Product[]> {
  const apiUrl = `https://alec-litho.github.io/data`;
  const response = await fetch(apiUrl);
  const data: ProductApiResponse = await response.json();
  const newData = data.slice(page, page+10)
  console.log(newData)
  const products: Product[] = newData.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description.slice(0, 100),
    price: product.price,
    currency: 'USD',
    image: product.image,
    rating: product.rating,
  }));

  return products;
}