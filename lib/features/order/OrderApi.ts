import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import params from "../../../params.json";
import { setCredentials, clearCredentials } from "../Auth/authSlice";
import { jwtDecode } from 'jwt-decode';

const baseQuery = fetchBaseQuery({
  baseUrl: `${params.baseUrl}/api/v1/order`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: { token: string } }).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
    return decoded.exp ? decoded.exp < now : true;
  } catch (error) {
    // If there's an error decoding the token, assume it's expired
    return true;
  }
};

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const state = api.getState() ;
  const accessToken = state.Auths?.accessToken || null;
  let result;
  
  if (accessToken && !isTokenExpired(accessToken)) {
    // If the access token is not expired, use it
    result = await baseQuery(args, api, extraOptions);
  } else {
    // If the token is expired or missing, try to refresh it
    const refreshResult = await baseQuery(
        { url: `${params.baseUrl}/api/v1/auth/refresh`},
        api,
        extraOptions
      );
    if ((refreshResult as { data?: { data?: string } })?.data?.data) {
      // const {accessToken} = api.getState().Auths;
      // store the new token
      api.dispatch(
        setCredentials({
          accessToken: (refreshResult.data as { data: string }).data,
        })
      );
      // retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
      return refreshResult;
    }
  }
  return result;
};

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseQueryWithReauth, 
    endpoints: (builder) => ({})
})

