// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // array to store items in the cart
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload); // Add the payload (book) to the items array
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
