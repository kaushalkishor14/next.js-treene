import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import params from "../../../params.json";

const baseQuery = fetchBaseQuery({
  baseUrl: `${params.baseUrl}/dashboard/blog/api`,
  credentials: "include",
});


export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: baseQuery, 
    endpoints: (build) => ({})
})

