// app/courses/AllCourses.tsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useRef } from "react";
import Link from "next/link";
import { FaReact, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbBrandNextjs, TbBrandAngular } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { courses } from "./data";

// Filter courses by language
const englishCourses = courses.filter(course => course.language === "English");
const hindiCourses = courses.filter(course => course.language === "Hindi");

const AllCourses = () => {
  // Ref to scroll areas
  const englishScrollRef = useRef(null);
  const hindiScrollRef = useRef(null);

  // Scroll functions
  const scrollLeft = (ref: any) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref: any) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };




  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };


  return (
    <div className="px-2 py-2 ">
      {/* English Courses Section */}
      <div className="flex justify-between items-center mb-4 px-10">
        <h2 className="text-2xl font-bold text-white">
          English Courses ({englishCourses.length})
        </h2>
        {/* Scroll Arrows */}
        <div className="flex space-x-2 px-10">
          <button
            className="bg-black p-2 rounded-full hover:bg-gray-700"
            onClick={() => scrollLeft(englishScrollRef)}
          >
            <FaArrowLeft className="text-white" />
          </button>
          <button
            className="bg-black p-2 rounded-full hover:bg-gray-700"
            onClick={() => scrollRight(englishScrollRef)}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
      </div>
      <div className="relative">
        {/* Scroll Area */}
        {/* <ScrollArea ref={englishScrollRef} className="h-64 mb-10 overflow-x-auto"> */}
        <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {englishCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-slate-900 text-gray-300 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-shadow duration-300  border border-gray-800 flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 mb-2 text-xl font-semibold">
                  <span>{course.title}</span>
                </CardTitle>
                <CardDescription>
                  <p className="mb-3 text-green-400">{truncateText(course.description, 15)}</p>
                  {/* <ul className="pl-5 capitalize text-xs list-outside list-disc grid grid-cols-4 gap-2" >
                      {
                        course.techStack.map((tech, index) => 
                          <li key={index}>{tech}</li>
                        )
                      }
                    </ul> */}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-semibold flex justify-center hover:bg-orange-600 transition-colors duration-300"
                  href={`/courses/${course.id}`} // Navigate to the course page by ID
                >
                  Explore
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* <ScrollBar orientation="horizontal" /> */}
        {/* </ScrollArea> */}
      </div>

      {/* Hindi Courses Section */}
      <div className="flex justify-between items-center mt-8 mb-4 px-10">
        <h2 className="text-2xl font-bold text-white">
          Hindi Courses ({hindiCourses.length})
        </h2>
        {/* Scroll Arrows */}
        <div className="flex space-x-2 px-10">
          <button
            className="bg-black p-2 rounded-full hover:bg-gray-700"
            onClick={() => scrollLeft(hindiScrollRef)}
          >
            <FaArrowLeft className="text-white" />
          </button>
          <button
            className="bg-black p-2 rounded-full hover:bg-gray-700"
            onClick={() => scrollRight(hindiScrollRef)}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
      </div>
      <div className="relative ">
        {/* <ScrollArea ref={hindiScrollRef} className="h-64 overflow-x-auto"> */}
          <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {hindiCourses.map((course) => (
              <Card
                key={course.id}
                className="min-w-[300px] bg-slate-900 p-2 hover:scale-105 text-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-800"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 mb-2 text-xl font-semibold">
                    <span>{course.title}</span>
                  </CardTitle>
                  <CardDescription>
                    <p>{truncateText(course.description, 15)}</p>
                    <ul>
                      <li>Language: {course.language}</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-semibold flex justify-center hover:bg-orange-600 transition-colors duration-300"
                    href={`/courses/${course.id}`} // Navigate to the course page by ID
                  >
                    Explore
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          {/* <ScrollBar orientation="horizontal" /> */}
        {/* </ScrollArea> */}
      </div>
    </div>
  );
};

export default AllCourses;
