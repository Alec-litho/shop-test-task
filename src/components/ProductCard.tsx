import { addToCart, removeFromCart } from '@/store/reducers/cartReducer';
import { useAppDispatch } from '@/store/store';
import { Product } from '@/types/product';
import React, { useRef, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  let [isAdded, setIsAdded] = useState(false)
  const card = useRef<HTMLDivElement>(null)

  const handleAddToCart = () => {
    if(isAdded) {
      setIsAdded(false)
      card.current!.className = "card border border-green-300 p-4 rounded flex flex-col justify-between";
      dispatch(removeFromCart(product.id));
    } else {
      setIsAdded(true)
      card.current!.className = "bg-green-100 card border border-green-300 p-4 rounded flex flex-col justify-between";
      dispatch(addToCart(product));
    }

  };
  return (
    <div className="card border-2 border-green-300 p-4 rounded flex flex-col justify-between" ref={card}>
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <div className="flex justify-center">
        <img src={product.image} alt={product.title} className="w-auto h-80 object-cover mb-4" />
      </div>
      <p className="text-gray-600 mb-2 ">{product.description}</p>
      <div className="">
      <div className="flex items-center justify-center gap-5">
        <p className="text-2xl mb-2 text-green-500">${product.price}</p>
        <div className="rating flex items-center justify-center">
          <p className="text-2xl mb-2 text-yellow-500">/ {product.rating}</p>
          <img src="/star-icon.jpg" alt="" className='w-7 h-auto'/>
        </div>
      </div>
      {
        isAdded?
        <button onClick={handleAddToCart} className="bg-red-500 text-white px-4 py-2 rounded w-full">remove</button>
        :
        <button onClick={handleAddToCart} className="bg-green-500 text-white px-4 py-2 rounded w-full">Add</button>
      }
        
      </div>
    
    </div>
  );
};

export default ProductCard;