import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import params from "../../../params.json";

const baseQuery = fetchBaseQuery({
    baseUrl: `${params.baseUrl}/api/v1/product`,
    credentials : 'include',
  });
  


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery : baseQuery,
    endpoints: (builder) => ({
        
    })
});