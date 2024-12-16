"use client";

import CoursePageWithCard from "@/components/user-components/courses/coursePageWithCard";
import { useGetCoursesQuery } from "@/lib/features/course/api";
import { setCourses } from "@/lib/features/course/courseSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";

export default function Endroll() {
  const { data, error, isLoading } = useGetCoursesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(setCourses(data));
    }
  }, [data]);
  return (
    <div>
      <div className="">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 size={50} className="animate-spin" />
          </div>
        ) : (
          // data?.map((course: any) => (
          <CoursePageWithCard courses={data} />
          // ))
        )}
      </div>
    </div>
  );
}
