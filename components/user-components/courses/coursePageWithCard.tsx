'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusCircle, Code, Server, Database, Brain, Sigma, Laptop, Users, Filter, Route } from "lucide-react"
import {Course} from "@/types/course"
import Link from 'next/link'


export default function FilteredCourseCatalog({courses}: {courses: Course[]}) {
  // const dispatch = useDispatch()

  const categories = [...new Set(courses?.flatMap((course: Course) => course.learningPoints || []))]

  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filteredCourses = selectedCategories.length > 0
    ? courses?.filter(course => course.learningPoints.some(point => selectedCategories.includes(point.toString())))
    : courses


    useEffect(() => {
      console.log(categories, 'categories')
    },[])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter Courses
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={selectedCategories.includes(category.toString())}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(
                      checked
                        ? [...selectedCategories, category.toString()]
                        : selectedCategories.filter((c) => c !== category.toString())
                    )
                  }}
                >
                  {category.toString()}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={()=>router.push('/dashboard/courses/add-course')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses?.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={"/"+course?.image}
                alt={`Thumbnail for ${course.name}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="absolute top-2 left-2 flex gap-1">
              {course?.learningPoints?.map((point, index) => 
                <Badge variant="secondary" key={index} className="text-xs font-semibold">
                  {point.toString()}
                </Badge>  
                )}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold line-clamp-2">{course.name}</h2>
                {/* <course.icon className="h-6 w-6 text-muted-foreground flex-shrink-0 ml-2" /> */}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Users className="h-4 w-4 mr-1" />
                {/* <span>{course.students.toLocaleString()} students</span> */}
              </div>
              <p className="text-sm font-medium">
                Taught by {course.username}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/courses/${encodeURIComponent(course?.name)}`}>
                <Button className="w-full">View Course</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}