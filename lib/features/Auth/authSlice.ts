'use client';

import { createSlice } from "@reduxjs/toolkit";

type User = {
    email: string;
    id: string;
    name: string;
}

const initialState = {
    user: null as User | null ,
    token: null as string | null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setCredentials: (state, action) => {
            state.token = action.payload.accessToken;
        }, 

        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
        }
    },
});


export const { setUser, setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;