import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import params from "../../../params.json";

const baseQuery = fetchBaseQuery({
    baseUrl: `${params.baseUrl}/api/v1/feature`,
    credentials : 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string } }).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  

export const productFeatureApi = createApi({
    reducerPath: "productFeature",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        
    })
});
