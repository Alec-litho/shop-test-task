import React, { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { removeFromCart, clearCart } from '@/store/reducers/cartReducer';
import { useCartSelector } from '@/store/selectors/useCartSelector';

const Cart: React.FC = () => {
  const cartItems = useCartSelector((cart) => cart.items);
  const dispatch = useAppDispatch();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div >
      <button className="bg-green-500 text-white px-4 py-2 rounded w-40" onClick={() => setIsCartModalOpen(true)}>
        Cart 
      </button>
      {isCartModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-80">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between border-b pb-2 mb-2">
                    <div>
                      <p>{item.product.title}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.product.price}</p>
                    </div>
                    <button onClick={() => handleRemoveFromCart(item.product.id)} className="text-red-500">
                      Remove
                    </button>
                  </div>
                ))}
                <p>Total Items: {totalItems}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <button onClick={handleClearCart} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                  Clear Cart
                </button>
              </div>
            )}
            <div className="w-full flex justify-center">
              <button onClick={() => setIsCartModalOpen(false)} className="mt-4 bg-red-500 rounded w-20 h-10 text-white">Close</button>
            </div>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
