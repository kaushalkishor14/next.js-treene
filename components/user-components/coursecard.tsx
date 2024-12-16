import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  // import { Input } from "@/components/ui/input";
  // import { Label } from "@/components/ui/label";
  import Link from "next/link";
  import { FaReact } from "react-icons/fa";
  import { TbBrandNextjs } from "react-icons/tb";
  import { TbBrandAngular } from "react-icons/tb";
  import { FaNodeJs } from "react-icons/fa";
import { courses } from "./data";
  


  const englishCourses = courses.filter(course => course.language === "English");


  
  function CoursesCard() {


    const truncateText = (text: string, wordLimit: number) => {
      const words = text.split(" ");
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
      }
      return text;
    };


    return (
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
    );
  }
  
  export default CoursesCard;
  