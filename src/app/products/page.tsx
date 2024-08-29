"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { AppDispatch, useAppDispatch } from '@/store/store';
import { fetchProductsAsync } from '@/store/reducers/productReducer';
import { useProductSelector } from '@/store/selectors/useProductSelector';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import {debounce} from "../helpers/debounce"

const ProductsPage: NextPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { products: allProducts, loading, error } = useProductSelector();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'rating'>('title');


  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll,500));

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight
    ) {
      fetchMoreProducts();
    }
  };

  const fetchMoreProducts = async () => {
    if (!isFetching) {
      setIsFetching(true);
      await dispatch(fetchProductsAsync());
      setIsFetching(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as 'title' | 'price' | 'rating');
  };

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div>
      <Head>
        <title>Product Listing Page</title>
        <meta
          name="description"
          content="Check out our latest products for sale."
        />
      </Head>
      <div>
        <header className="flex justify-center items-center fixed top-0 left-0 right-0 bg-green-100 p-4">
          <Cart />
        </header>
        <div className="flex justify-center gap-5 items-center pt-20 pb-4">
        <div className="mb-4 flex justify-center items-center">
            <label htmlFor="sortBy" className="mr-2">
              Sort:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortByChange}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="mb-4 mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-300 rounded px-4 py-2 w-400px h-50px outline-none"
            />
          </div>

        </div>
        {loading ? <p>Loading...</p> : null}
        {error ? <p>Error: {error}</p> : null}
        <div className="grid grid-cols-3 gap-5 p-5">
          {allProducts.length!==0? 
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
          :
          <div className="w-full flex justify-center">
            <h1>You ran out of Products, sorry</h1>
          </div>
        }
        </div>
      </div>

    </div>

  );
};

export default ProductsPage;

export async function getServerSideProps() {
  return {
    props: {},
  };
}

