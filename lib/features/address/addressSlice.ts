import { createSlice } from "@reduxjs/toolkit";

interface Address {
    _id: string;
    // Add other address fields here
}

const initialState: { address: Address[]; loading: boolean } = {
    address: [],
    loading: false,
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        addAddress: (state, action) => {
            state.address = action.payload;
        },

        removeFromAddress: (state, action) => {
            // remove the item i have id in action.payload
            state.address.filter((address)=> address._id != action.payload);
        },

        updateAddress: (state, action) => {
            state.address = action.payload;
        },
        getAddress: (state: { address: Address[] }, action: { payload: Address[] }) => {
            state.address = action.payload;
        },

        addSingleAddress: (state: { address: Address[] }, action: { payload: Address }) => {
            state.address.push(action.payload);
        }
    },
});

export const { addAddress, removeFromAddress, updateAddress, getAddress , addSingleAddress} = addressSlice.actions;
export default addressSlice.reducer;