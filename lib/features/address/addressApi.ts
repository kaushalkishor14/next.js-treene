import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import params from "../../../params.json";
import {jwtDecode} from "jwt-decode";
import { setCredentials, clearCredentials } from "@/lib/features/Auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${params.baseUrl}/api/v1/address`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: { token: string } }).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const isTokenExpired = (token:any) => {
  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
    return decoded.exp !== undefined && decoded.exp < now;
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
    if (refreshResult?.data && typeof refreshResult.data === 'object' && 'data' in refreshResult.data) {
      // const {accessToken} = api.getState().Auths;
      localStorage.setItem("user", "true");
      // store the new token
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.data,
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

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});