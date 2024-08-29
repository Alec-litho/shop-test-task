import { Product } from '@/types/product';
import { fetchProducts } from '@/utils/api';
import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 0
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    incrementCurrentPage(state) {
      state.currentPage += 10;
    },
  },
});

export const { setProducts, setLoading, setError, incrementCurrentPage } = productSlice.actions;

export const fetchProductsAsync = ():
  ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: AppDispatch, getState) => {
    try {
      dispatch(setLoading(true));

      const { currentPage, products } = getState().products;
      const newProducts = await fetchProducts(currentPage);

      if (currentPage === 0) {
        dispatch(setProducts(newProducts));
      } else {
        dispatch(setProducts([...products, ...newProducts]));
      }
      dispatch(incrementCurrentPage());
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error)
      dispatch(setError('Error fetching products.'));
      dispatch(setLoading(false));
    }
  };
export default productSlice.reducer;