import { productApi } from "./productApi";
import { productFeatureApi } from "./featureApi";


productApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (info) => ({
        url: `/get-all-products?page=${info?.page}&limit=${info?.limit}`,
        method: "GET",
     
      })
    }),
    getProduct: build.query({
      query: (id) => `products/${id}`,
    }),

    getProductsBySearch: build.mutation({
      query: (info) => ({
        url: `/search-product?search=${info?.search}`,
        method: "GET",
      }),
    }),

    getProductByTitle: build.query({
      query: (title) => ({
        url: `/get-product-by-title/${title}`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductQuery,
  useGetProductByTitleQuery,
  useGetProductsBySearchMutation,
} = productApi as any;


productFeatureApi.injectEndpoints({
  endpoints:(build)=>({
    getFeatureSection : build.query({
      query: () => ({
        url: `/get-all-feature`,
        method: "GET",
      }),
    }),
    getFeatureSectionById : build.query({
      query: (id: any) => ({
        url: `/get-feature-by-id/${id}`,
        method: "GET",
      }),
    }),
  })
})
export const {
  useGetFeatureSectionQuery,
  useGetFeatureSectionByIdQuery,
  useGetFeatureByNamesQuery,
} = productFeatureApi as any;