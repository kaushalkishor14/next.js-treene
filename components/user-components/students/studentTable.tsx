'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import prisma from '@/lib/prisma'

// Mock data for initial students
const initialStudents = [
  { id: 1, name: "John Doe", email: "john@example.com", course: "React Basics", phone: "123-456-7890", futureGoals: "Become a frontend developer", status: "Enrolled" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", course: "Python for Beginners", phone: "098-765-4321", futureGoals: "Data scientist", status: "Not Enrolled" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", course: "Advanced JavaScript", phone: "111-222-3333", futureGoals: "Full-stack developer", status: "Enrolled" },
]

const courses = ["React Basics", "Python for Beginners", "Advanced JavaScript", "Machine Learning Fundamentals", "Web Design Principles"]


export default function StudentRegistration() {

  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCourse, setFilterCourse] = useState("")
  const [newStudent, setNewStudent] = useState({ name: "", email: "", course: "", phone: "", futureGoals: "" })

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCourse === "" || student.course === filterCourse)
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewStudent(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = students.length + 1
    const status = Math.random() > 0.5 ? "Enrolled" : "Not Enrolled" // Random status for demonstration
    setStudents(prev => [...prev, { ...newStudent, id, status }])
    setNewStudent({ name: "", email: "", course: "", phone: "", futureGoals: "" })
  }


  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/dashboard/students/api")
      const data = await response.json()
      setStudents(data)
    }

    fetchStudents()
  },[])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Register</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={newStudent.name} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={newStudent.email} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="course">Course</Label>
          <Select name="course" value={newStudent.course} onValueChange={(value) => setNewStudent(prev => ({ ...prev, course: value }))}>
            <SelectTrigger id="course">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course} value={course}>{course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={newStudent.phone} onChange={handleInputChange} required />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="futureGoals">Future Goals</Label>
          <Input id="futureGoals" name="futureGoals" value={newStudent.futureGoals} onChange={handleInputChange} required />
        </div>
        <Button type="submit" className="md:col-span-2 w-[200px]">Register Student</Button>
      </form>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filterCourse} onValueChange={setFilterCourse}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AllCourse">All Courses</SelectItem>
            {courses.map(course => 
              <SelectItem key={course} value={course}>{course}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Future Goals</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.futureGoals}</TableCell>
                <TableCell>
                  <Badge variant={student.status === "Enrolled" ? "default" : "secondary"}>
                    {student.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}