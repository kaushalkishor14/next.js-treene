
import { createSlice } from "@reduxjs/toolkit";

import { Block } from "@/types/blog";

const initialState: { blogs: Block[] } = {
  blogs: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action: { payload: Block[] }) => {
      state.blogs.push(...action.payload);
    },
    removeBlog: (state, action: { payload: string }) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
  },
});


export const { addBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;