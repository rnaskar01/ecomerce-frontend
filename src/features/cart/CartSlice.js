import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTocart,fetchItemsByUserId,updateCart,deleteItemFromcart, rsesetCart} from './CartAPI';

const initialState = {
  status: 'idle',
  items: [],
  cartLoaded:false
};


export const addTocartAsync = createAsyncThunk(
  'cart/addTocart',
  async (item) => {
    const response = await addTocart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const rsesetCartAsync = createAsyncThunk(
  'cart/rsesetCart',
  async () => {
    const response = await rsesetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromcartAsync = createAsyncThunk(
  'cart/deleteItemFromcart',
  async (itemId) => {
    const response = await deleteItemFromcart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
 
      state.value += 1;
    },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(addTocartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTocartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })

      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
        state.cartLoaded=true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded=true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })

      .addCase(deleteItemFromcartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromcartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })

      .addCase(rsesetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(rsesetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[];
      });
  },
});

export const { increment } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;



export default cartSlice.reducer;
