import { orderApi } from "./OrderApi";


orderApi.injectEndpoints({
    endpoints: (builder) => ({

        getOrder: builder.query({
            query: (id) => `/getOrderFrom-UserId/${id}`,
        }),

        createOrder: builder.mutation({
            query: (body) => ({
                url: '/order-add',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetOrderQuery,
    useCreateOrderMutation,
} = orderApi as any;

