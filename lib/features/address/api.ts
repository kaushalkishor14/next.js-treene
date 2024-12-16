import { addressApi } from './addressApi';

addressApi.injectEndpoints({
    endpoints: (builder) => ({
        getAddress: builder.query({
            query: () => "/get-all-address",
        }),

        addAddress: builder.mutation({
            query: (data) => ({
                url: "/add-new-address",
                method: "POST",
                body: data,
            }),
        }),
        updateAddress: builder.mutation({
            query: (data) => ({
                url: `/update-address/${data.id}`,
                method: "PUT",
                body: data.data,
            }),
        }),
        removeAddress: builder.mutation({
            query: (id) => ({
                url: `/delete-address/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetAddressQuery, useAddAddressMutation, useUpdateAddressMutation, useRemoveAddressMutation } = addressApi as any;