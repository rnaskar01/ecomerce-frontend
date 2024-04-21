import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateOrder, createOrder,fetchAllOrders } from './orderAPI';
const initialState = {
 // Allorders:[],
  orders:[],
  status: 'idle',
  currentorder: null,
  totalOrders:0,
};


export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const UpdateOrderAsync = createAsyncThunk(
  'order/UpdateOrder',
  async (order) => {
    const response = await UpdateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort,pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   resetOrder:(state)=>{
    state.currentorder = null;
   },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentorder=action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders;
       state.totalOrders = action.payload.totalOrders;
      })
      .addCase(UpdateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index]=action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;


export const selectcurrentorder = (state) => state.order.currentorder;
export const selectAllOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
