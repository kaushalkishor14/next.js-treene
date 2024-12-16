import { blogApi } from "@/lib/features/blog/blogApi";

blogApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => "blogs",
    }),
    addBlog: build.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
    updateBlog: build.mutation({
      query: (data) => ({
        url: "update",
        method: "PUT",
        body: data,
      }),
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: "delete",
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
} = blogApi as any;
