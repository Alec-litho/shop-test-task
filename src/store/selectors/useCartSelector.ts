import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useCartSelector = <T>(selector: (state: RootState['cart']) => T) => {
  return useSelector((state: RootState) => selector(state.cart));
};
