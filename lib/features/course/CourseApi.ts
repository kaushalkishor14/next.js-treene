import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import params from "../../../params.json";

const baseQuery = fetchBaseQuery({
  baseUrl: `${params.baseUrl}/dashboard/courses`,
  credentials: "include",
});


export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: baseQuery, 
    endpoints: (builder) => ({})
})

