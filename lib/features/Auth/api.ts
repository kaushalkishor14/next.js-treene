'use client';

import { authApi } from "./authApi";


authApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/local/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        refreshToken: builder.query({
            query: () => ({
                url: '/login/refreshtoken/api',
                method: 'get',
            }),
        }),

        register: builder.mutation({
            query: (credentials) => ({
                url: '/local/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: '/me',
                method: 'GET',
            }),
        }),
    }),
});

export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation, 
    useGetUserQuery,
    useLazyRefreshTokenQuery
 } = authApi as any;