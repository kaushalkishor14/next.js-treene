// components/courses/AllCourses.js

import React from 'react';

const AllCourses = () => {
  const courses = [
    { id: 1, title: 'Course 1', description: 'Description for Course 1' },
    { id: 2, title: 'Course 2', description: 'Description for Course 2' },
    { id: 3, title: 'Course 3', description: 'Description for Course 3' },
    // Add more courses as needed
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <ul className="space-y-4">
        {courses.map(course => (
          <li key={course.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCourses;
