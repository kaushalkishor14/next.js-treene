import { createSlice } from "@reduxjs/toolkit";
// import { Order } from "../../types"; // Adjust the import path as necessary

const orderSlice = createSlice({
  name: "order",
  initialState: {
      orders: [] as any,
  },

  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    addNewOrder: (state, action: { payload: any }) => {
      state.orders.push(action.payload);
    }
  },
});



export const { setOrders, addNewOrder } = orderSlice.actions;
export default orderSlice.reducer;