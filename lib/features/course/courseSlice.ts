import { createSlice } from "@reduxjs/toolkit";
// import { Course } from "../../types"; // Adjust the import path as necessary

const courseSlice = createSlice({
  name: "course",
  initialState: {
      course : [] as any,
      categories: [] as any,
  },

  reducers: {
    setCourses: (state, action) => {
        state.course = action.payload
    },

    addNewCourse: (state, action: { payload: any }) => {
        state.course.push(action.payload);
    },

    setCategories: (state, action: { payload: any }) => {
        state.categories = action.payload;
    }
  },
});



export const { setCourses, addNewCourse, setCategories } = courseSlice.actions;
export default courseSlice.reducer;