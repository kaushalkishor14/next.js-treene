"use client";

import { useParams } from "next/navigation";
import courseContentData, { courses } from "@/components/user-components/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import StarRating from "@/components/user-components/StarRating";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, ChevronDownIcon } from "lucide-react";

const SingleCourse = () => {
  const { id } = useParams(); // Access the course ID from the dynamic route

  // Find the course by ID
  const course = courses.find((course) => course.id?.toString() === id);

  if (!course) {
    return <div className="text-white text-center py-10">Course not found</div>;
  }

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: course.title, href: "#" }, // Assuming current page
  ];

  return (
    <div className="">
      <div className="text-white flex flex-col">
        {/* Breadcrumb */}
        <div className="py-4">
          {/* <Breadcrumb items={breadcrumbItems} separator={<ChevronRight />} /> */}
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col lg:flex-row bg-gray-800 px-6 lg:px-12 py-10">
          <div className="flex-1 text-center flex flex-col items-start gap-1 p-6 lg:p-10">
            <h1 className="text-3xl lg:text-5xl font-bold mb-2">
              {course.title}
            </h1>
            <p className="text-gray-400 ">
              {truncateText(course.description, 15)}
            </p>
            <div className="flex items-center mt-2">
              <StarRating rating={course.rating} reviews={course.reviews} />
            </div>
            <span>Created by {course.author}</span>
            <span className="text-gray-400">
              Last Updated: {course.lastUpdated} | Duration: {course.duration} |
              Language: {course.language}
            </span>
          </div>

          {/* Card Section */}
          <div className="lg:absolute lg:right-20 lg:top-10 flex flex-col justify-center items-center max-w-sm h-100 lg:shadow-lg lg:rounded-lg lg:bg-slate-900 ">
            <Card className="bg-slate-900 text-gray-300 p-6 w-full lg:max-w-sm border border-gray-700">
              <CardHeader>
                <img
                  className="w-full h-40 object-cover rounded-lg"
                  src={course.image}
                  alt={course.title}
                />
                <CardTitle className="text-2xl lg:text-4xl font-bold mb-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {course.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(course.rating)
                            ? "text-yellow-500"
                            : "text-gray-600"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </span>
                  <span className="ml-2 text-gray-400">
                    {course.rating} ({course.reviews} reviews)
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-gray-400">
                    Last Updated: {course.lastUpdated}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-gray-400">
                    Language: {course.language}
                  </span>
                </div>
              </CardHeader>
              <CardFooter>
                <Button className="p-4 w-full bg-orange-400 font-semibold hover:bg-orange-500">
                  Start Enrolling
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="px-6 lg:px-12 max-w-5xl py-10">
        <div className="border border-gray-700 p-4 flex flex-col text-white rounded mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.learnings.map((learning, index) => (
              <div key={index} className="flex items-center gap-2 ">
                <Check className="h-6 w-4" /> {learning}
              </div>
            ))}
          </div>
        </div>

        {/* Course Content Section */}
        <div className="max-w-5xl py-10 px-6 mx-auto text-gray-100">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-2 text-orange-500">
            Course Content
          </h1>
          <p className="text-gray-400 mb-6">
            6 sections • 25 lectures • 4h 45m total length
          </p>

          {/* Accordion */}
          <div className="bg-gray-800 border border-gray-700 rounded p-4">
            <Accordion type="single" collapsible className="w-full">
              {courseContentData.map((section, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="mb-2 border-none"
                >
                  <AccordionTrigger className="flex justify-between items-center hover:no-underline p-3 bg-gray-700 rounded hover:bg-gray-600 transition duration-200">
                    <span className="font-semibold">
                      {section.sectionTitle}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="">
                    <ul className="bg-gray-900 rounded-lg p-3 mt-2 space-y-3">
                      {section.lectures.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex justify-between items-center px-3 py-2 rounded hover:bg-gray-700 transition duration-200"
                        >
                          <span className="text-gray-300">{lecture.title}</span>
                          <span className="text-sm text-gray-500">
                            {lecture.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Description section */}

        <div className="max-w-5xl py-10 px-6 mx-auto text-gray-100">
          <h1 className="text-3xl font-bold mb-2 text-orange-500">
            Description
          </h1>
          <p className="text-gray-400">{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
