"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Pencil,
  Trash2,
  ExternalLink,
  Plus,
  Clock,
  Globe,
  IndianRupee,
  Check,
  CircleArrowRight,
  CalendarCheck,
  CalendarX,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import CourseForm from "@/components/courses/addCourse";
import { useParams } from "next/navigation";
import { Course, CourseFormData } from "@/types/course";
import { useSelector } from "react-redux";
import { useGetCourseByNameQuery } from "@/lib/features/course/api"
import { useRouter } from "next/navigation";
interface NewCourse extends CourseFormData {
  id: string;
}



export default function CoursesPage() {
  const router = useRouter();
  const { name } = useParams();
  const { data: course , isLoading} = useGetCourseByNameQuery(typeof name === 'string' ? decodeURIComponent(name) : '');
  const [courses, setCourses] = useState(course);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Removed duplicate handleUpdate function

  const handleUpdate = (updatedCourse: CourseFormData) => {
    interface EditableCourse extends Course {
      id: string;
    }

        setCourses(
          courses?.map((course: EditableCourse) =>
            course.id === editingCourse?.id
              ? { ...updatedCourse, id: editingCourse.id } as EditableCourse
              : course
          )
        );
    setEditingCourse(null);
  };

  const handleAdd = (newCourse: CourseFormData) => {
    setCourses([...courses, { ...newCourse, id: Date.now().toString() }]);
  };

  const calculateDuration = (startDate: string, endDate: string): string => {
    const start: Date = new Date(startDate);
    const end: Date = new Date(endDate);
    const diffTime: number = Math.abs(end.getTime() - start.getTime());
    const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  function handleDelete(id: string): void {
    setCourses((prevCourses: Course[]) => 
      prevCourses.filter((course: Course): boolean => course.id !== id)
    );
  }


  useEffect(() => {
    if (name && typeof name === 'string') {
      setCourses(course?.filter((course: Course) => course.name === decodeURIComponent(name)));
  console.log(decodeURIComponent(name),"name")

    }
  },[name, course])

  console.log(courses, 'courses')

  if(isLoading){
    return (
      <div className="max-h-full max-w-full m-auto items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-2">
      <div className="py-4">
          <Button onClick={()=>router.back()}>
            <ArrowLeft color="white" className="" />
          </Button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <ScrollArea className="max-h-[80vh]">
              <CourseForm onSubmit={handleAdd} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-8">
        {courses?.map((course: Course) => (
          <Card key={course.id} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={"/"+course.image}
                  alt={course.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <CardTitle className="text-2xl">{course.name}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Instructor: {course.username}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCourse(course)}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px]">
                    <ScrollArea className="max-h-[80vh]">
                      <CourseForm
                        initialData={editingCourse || undefined}
                        onSubmit={handleUpdate}
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(course.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{course.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      What You'll Learn
                    </h3>
                    <ul className="list-disc list-inside">
                      {course.learningPoints.map((point, index) => (
                        <li key={index} className="text-gray-700">
                          {point.point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Additional Resources
                    </h3>
                    <ul className="space-y-1 list-decimal">
                      {course.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            {link.url} <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Course Details</h3>
                  <div className="space-y-3 grid grid-cols-3 items-center justify-center">
                    <div className="flex items-center">
                      <Clock color="#000000" className="h-5 w-5  mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Duration:</span>
                        <p>
                          {calculateDuration(course.startDate, course.endDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CalendarCheck color="#000000" className="h-5 w-5  mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Start Date:</span>
                        <p>{new Date(course.startDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CalendarX color="#000000" className="h-5 w-5  mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">End Date:</span>
                        <p>{new Date(course.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Globe color="#000000" className="h-5 w-5  mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Language:</span>
                        <p>
                          {course.language === "en"
                            ? "English"
                            : course.language}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <IndianRupee color="#000000" className="h-5 w-5  mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Price:</span>
                        <p> {course.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="text-xl font-semibold mb-4">Course Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {course.modules.map((module, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>
                          <div>
                            <Badge className="rounded-none bg-orange-500 text-black">
                              {"Module "+index+1}
                            </Badge>
                          </div>
                          <div>
                            <span>
                              {module.moduleName} 
                            </span>
                            <span className="mx-2">
                              <Badge>
                                {module.lectures.length} Lectures
                              </Badge>
                            </span>
                          </div>
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {module.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold mb-2">Lectures:</h4>
                        <ul className="list-inside  list-decimal pl-2">
                          {module.lectures.map((lecture, lectureIndex) => (
                            <li key={lectureIndex} className="flex items-center gap-2"> <CircleArrowRight color="#000000" size={15}/> {lecture.name}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
