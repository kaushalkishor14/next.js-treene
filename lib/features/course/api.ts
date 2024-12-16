import {courseApi} from "@/lib/features/course/CourseApi";


courseApi.injectEndpoints({
    endpoints: build => ({
        getCourses: build.query({
            query: () => `/GetCourse/api`,
        }),
        
        addCourse: build.mutation({
            query: (course) => ({
                url: "/add-course/api",
                method: "POST",
                body: course
            })
        }),
        updateCourse: build.mutation({
            query: (course) => ({
                url: "",
                method: "PUT",
                body: course
            })
        }),
        deleteCourse: build.mutation({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "DELETE",
            })
        }),
        uploadImage: build.mutation({
            query: (file) => ({
                url: "/add-course/upload/",
                method: "POST",
                body: file
            })
        }),

        getCourseByName: build.query({
            query: (name) => `/GetCourse/api?name=${name}`,
        }),
    })
});


export const { useGetCoursesQuery, useAddCourseMutation, useUpdateCourseMutation, useDeleteCourseMutation, useUploadImageMutation, useGetCourseByNameQuery } = courseApi as any;