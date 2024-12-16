'use client';

import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/Auth/authSlice';
import { authApi } from '../features/Auth/authApi';
import addressReducer from '@/lib/features/address/addressSlice';
import { addressApi } from '@/lib/features/address/addressApi';
import productReducer from '@/lib/features/product/productSlice';
import { productApi } from '@/lib/features/product/productApi';
import courseReducer from '@/lib/features/course/courseSlice';
import { courseApi } from '@/lib/features/course/CourseApi';
import { blogApi } from '@/lib/features/blog/blogApi';
import blogReducer from '@/lib/features/blog/blogSlice';



const store = configureStore({
    reducer: {
        Auths: AuthReducer,
        [authApi.reducerPath]: authApi.reducer,
        Address : addressReducer,
        [addressApi.reducerPath] : addressApi.reducer,
        Products : productReducer,
        [productApi.reducerPath]: productApi.reducer,
        courses : courseReducer,
        [courseApi.reducerPath]: courseApi.reducer,
        // Blog: blogReducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, addressApi.middleware , productApi.middleware, courseApi.middleware,
            blogApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;