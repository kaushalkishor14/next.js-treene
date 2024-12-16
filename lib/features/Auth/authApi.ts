"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/lib/store/store";
import {
  clearCredentials,
  setCredentials,
} from "@/lib/features/Auth/authSlice";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number; // Expiration time in seconds since the epoch
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
    return decoded.exp < now;
  } catch (error) {
    // If there's an error decoding the token, assume it's expired
    return true;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  // prepareHeaders: (headers, { getState }) => {
  //   const state = getState() as RootState;
  //   const accessToken = state.Auths?.token || null;
  //   if (accessToken) {
  //     headers.set("authorization", `Bearer ${accessToken}`);
  //   }
  //   return headers;
  // },
  credentials: "include",
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any): Promise<any> => {
    const state = api.getState() as RootState;
    const accessToken = state.Auths?.token || null;
    let result;

    if(args.url === '/register' || args.url === '/login' || accessToken){
      result = await baseQuery(args, api, extraOptions);
      return result;
    }
    
    if (accessToken && !isTokenExpired(accessToken)) {
      // If the access token is not expired, use it
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If the token is expired or missing, try to refresh it
      const refreshResult = await baseQuery('/refresh-token', api, extraOptions);
  
      if (refreshResult.data) {
        const newToken = refreshResult.data;
        // Store the new token
        api.dispatch(setCredentials({ accessToken: newToken }));
        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearCredentials());
        return refreshResult;
      }
    }
    return result;
  };

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
