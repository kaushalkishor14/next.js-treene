// import { TbBrandNextjs } from "react-icons/tb";

export const courseModules = [
  {
    module: "Programming with JavaScript - Basics and Concepts",
    tag: ["Programming", "JavaScript"],
    topics: [
      {
        name: "Introduction to JavaScript",
        des: " History, use cases, and setting up the environment",
      },
      {
        name: "Data Types & Variables",
        des: " Strings, numbers, booleans, arrays, and objects",
      },
      {
        name: "Control Structures",
        des: " Conditions (if-else, switch), loops (for, while)",
      },
      {
        name: "Functions",
        des: " Declaration, expressions, arrow functions, and higher-order functions",
      },
      {
        name: "Objects & Arrays",
        des: " Manipulating objects and arrays, deep dive into object-oriented programming",
      },
      {
        name: "DOM Manipulation",
        des: "Selecting, modifying, and creating elements in the DOM",
      },
      {
        name: "Asynchronous JavaScript",
        des: " Promises, async/await, and callback functions",
      },
      {
        name: "Error Handling",
        des: " Try-catch blocks, debugging, and error prevention strategies",
      },
    ],
  },
  {
    module: "Frontend Development with React.js & Next.js",
    tag: ["Frontend", "React", "Next.js", "Design"],
    topics: [
      {
        name: "Web Architecture",
        des: "Overview of client-server architecture",
      },
      {
        name: "HTML/CSS Basics",
        des: " Semantic HTML, layouts with CSS (Flexbox & Grid)",
      },
      {
        name: "Responsive Design",
        des: " Media queries, mobile-first design, and accessibility",
      },
      {
        name: "JavaScript in the Browser",
        des: " Manipulating the DOM, event-driven programming",
      },
      {
        name: "Client & Server Concept",
        des: "Understanding the client-server model and HTTP requests",
      },
      {
        name: "Single Page Applications (SPA)",
        des: "Key concepts and benefits",
      },
      {
        name: "Web APIs",
        des: " Local storage, geolocation, and other browser APIs",
      },
      {
        name: "React.js Fundamentals",
        des: "JSX, components, state management, and hooks",
      },
      {
        name: "Next.js Basics",
        des: "Static site generation (SSG), server-side rendering (SSR), and API routes",
      },
      {
        name: "API Integration in Projects",
        des: "Fetching and displaying data from an API in React and Next.js projects",
      },
      {
        name: "Git & GitHub: Version control, creating repositories, branching, and pull requests",
      },
      {
        name: "Tailwind CSS",
        des: "Utility-first CSS framework for rapid UI development",
      },
    ],
  },
  {
    module: "Frontend Projects & Database Design",
    tag: ["Frontend", "Database", "Project"],
    topics: [
      {
        name: "Project 1: HTML/CSS Landing Page",
        des: "Build a static, responsive landing page without a framework",
      },
      {
        name: "Project 2: React CMS for Course & Students",
        res: "Create a Content Management System with React for managing courses and students",
      },
      {
        name: "Project 3: Next.js SaaS App",
        des: "Develop a Testimonial Writer SaaS app with link generation and dynamic pages using Next.js",
      },
      {
        name: "Database Design",
        des: "Fundamentals of relational (SQL) and non-relational (NoSQL) database design",
      },
      {
        name: "MongoDB Basics",
        des: "CRUD operations, collections, documents, and MongoDB Atlas setup",
      },
      {
        name: "API Integration in Projects",
        des: "Fetching and displaying data from an API in React and Next.js projects",
      },
      {
        name: "Git & GitHub Projects",
        des: "Collaborating on GitHub, submitting pull requests, and maintaining project versions",
      },
    ],
  },
  {
    module: "Backend Development & Advanced Database",
    tag: ["Backend", "Database"],
    topics: [
      {
        name: "Database Design & Best Practices",
        des: "Optimizing database schemas, relationships, and indexing",
      },
      {
        name: "Data Modeling",
        des: "Creating models for users, products, orders, etc.",
      },
      {
        name: "API Design with Node.js & Express.js",
        des: "RESTful API development and best practices",
      },
      {
        name: "MVC Architecture",
        des: "Introduction to the Model-View-Controller pattern for server-side applications",
      },
      {
        name: "Microservices Architecture",
        des: "Designing scalable and distributed applications",
      },
      {
        name: "Authentication & Authorization",
        des: "OAuth, JWT (JSON Web Tokens), session management, role-based access control",
      },
      {
        name: "Database Security",
        des: "Encryption, backups, and access control",
      },
      {
        name: "Token Systems & Cookies",
        des: "Handling cookies, localStorage, and token-based authentication",
      },
      {
        name: "Middleware",
        des: "Creating middleware for logging, error handling, authentication",
      },
      {
        name: "Aggregation Functions in MongoDB",
        des: "Filtering, grouping, and transforming data",
      },
      {
        name: "Real-time Applications",
        des: "Introduction to WebSockets and Socket.IO for real-time communication",
      },
    ],
  },
  {
    module: "Projects & Testing",
    tag: ["Project", "Backend", "Database"],
    topics: [
      {
        name: "System Design & Architecture",
        des: "Project planning, designing scalable systems, and selecting the right tech stack",
      },
      {
        name: "Project 1: Social Media App (YouTube Clone)",
        des: "Build a YouTube-like platform with features like user authentication, video uploads, and commenting",
      },
      {
        name: "Project 2: Store Management System",
        des: "Create a store management app with real-time analytics, inventory tracking, and notifications",
      },
      {
        name: "Real-time Chat Application",
        des: "Build a live chat feature using WebSockets or Socket.IO",
      },
      {
        name: "Problem Solving & Critical Thinking",
        des: "Code reviews, debugging techniques, and real-world problem-solving challenges",
      },
      {
        name: "Test-driven Development (TDD)",
        des: "Writing test cases for projects, and practicing TDD with Jest or Mocha",
      },
      {
        name: "Open Source Contribution",
        des: "Introduction to contributing to open-source projects, best practices for submitting pull requests, and collaborating on GitHub",
      },
      {
        name: "Real-time Analytics & Notifications",
        des: "Implementing analytics tracking and in-app notifications using WebSockets",
      },
    ],
  },
];

export const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    bio: "With over 15 years of experience in tech, Alice leads our company vision and strategy.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "https://twitter.com/alicejohnson",
      linkedin: "https://linkedin.com/in/alicejohnson",
      github: "https://github.com/alicejohnson",
    },
  },
  {
    name: "Bob Smith",
    role: "CTO",
    bio: "Bob oversees our technical operations and ensures we're always at the cutting edge of technology.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "https://twitter.com/bobsmith",
      linkedin: "https://linkedin.com/in/bobsmith",
      github: "https://github.com/bobsmith",
    },
  },
  {
    name: "Carol Martinez",
    role: "Lead Designer",
    bio: "Carol brings our ideas to life with her innovative and user-centric design approach.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "https://twitter.com/carolmartinez",
      linkedin: "https://linkedin.com/in/carolmartinez",
      github: "https://github.com/carolmartinez",
    },
  },
  {
    name: "David Lee",
    role: "Senior Developer",
    bio: "David's expertise in full-stack development helps us build robust and scalable solutions.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "https://twitter.com/davidlee",
      linkedin: "https://linkedin.com/in/davidlee",
      github: "https://github.com/davidlee",
    },
  },
  {
    name: "Eva Brown",
    role: "Marketing Manager",
    bio: "Eva crafts our brand message and ensures it resonates with our target audience.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "https://twitter.com/evabrown",
      linkedin: "https://linkedin.com/in/evabrown",
      github: "https://github.com/evabrown",
    },
  },
  {
    name: "Frank Wilson",
    role: "Product Manager",
    bio: "Frank translates customer needs into product features, guiding our development roadmap.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "https://twitter.com/frankwilson",
      linkedin: "https://linkedin.com/in/frankwilson",
      github: "https://github.com/frankwilson",
    },
  },
];

// -------------------------------------------------------- Course Data --------------------------------------------------------
import { ReactElement } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { TbBrandNextjs, TbBrandAngular } from "react-icons/tb";

// Define the Course type
export type Course = {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  duration: string;
  link: string;
  techStack?: string[];
  rating: number;
  reviews: number;
  lastUpdated: string;
  learnings: string[];
  author?: string;
  image?: string;
};

export const courses: Course[] = [
  {
    id: "1",
    title: "The React Bootcamp 2024",
    description: "Master React from fundamentals to advanced techniques in just three months. Build dynamic UIs, manage complex state with Redux, and dive deep into hooks and Context API. Perfect for beginners wanting to excel.",
    language: "English",
    link: "/course/react",
    duration: "3 months",
    level: "Beginner to Advanced",
    rating: 4.8,
    reviews: 2500,
    lastUpdated: "September 2024",
    learnings: [
      "Advanced component architecture",
      "Context API & Redux for state management",
      "React Router for single-page applications",
      "Core React hooks like useEffect and useReducer",
    ],
    author: "Alice Johnson",
    image: "/React_Native_Logo.png"
  },
  {
    id: "2",
    title: "Next.js Mastery",
    description: "Become a Next.js expert! Learn server-side rendering, static site generation, and API routes while building fast, scalable applications. A must for React developers aiming to expand their skills.",
    language: "English",
    link: "/course/next",
    techStack: ["Next.js", "React", "Node.js"],
    duration: "3 months",
    level: "Intermediate to Advanced",
    rating: 4.8,
    reviews: 1800,
    lastUpdated: "September 2024",
    learnings: [
      "Server-side rendering (SSR) & static generation",
      "API routes for backend integration",
      "Data fetching with SWR and React Query",
      "Advanced component design and optimization",
    ],
    author: "Bob Smith",
    image: "/images.png"
  },
  {
    id: "3",
    title: "Angular Foundations",
    description: "Jumpstart your Angular journey! This course covers TypeScript basics, RxJS for reactive programming, and Angular’s component-based architecture. Ideal for beginners aiming for strong foundations.",
    language: "Hindi",
    link: "/course/angular",
    techStack: ["Angular", "TypeScript", "RxJS"],
    duration: "3 months",
    level: "Beginner",
    rating: 4.7,
    reviews: 1500,
    lastUpdated: "September 2024",
    learnings: [
      "Angular components and data binding",
      "Reactive programming with RxJS",
      "State management with NgRx",
      "UI design with Angular Material",
    ],
    author: "Ravi Verma",
    image: "/Angular.png"
  },
  {
    id: "6",
    title: "Angular Foundations",
    description: "Jumpstart your Angular journey! This course covers TypeScript basics, RxJS for reactive programming, and Angular’s component-based architecture. Ideal for beginners aiming for strong foundations.",
    language: "Hindi",
    link: "/course/angular",
    techStack: ["Angular", "TypeScript", "RxJS"],
    duration: "3 months",
    level: "Beginner",
    rating: 4.7,
    reviews: 1500,
    lastUpdated: "September 2024",
    learnings: [
      "Angular components and data binding",
      "Reactive programming with RxJS",
      "State management with NgRx",
      "UI design with Angular Material",
    ],
    author: "Ravi Verma",
    image: "/Angular.png"
  },
  {
    id: "4",
    title: "Node.js Essentials",
    description: "Master back-end development with Node.js. This course covers Express.js for routing, MongoDB for data management, and RESTful API creation. Designed for front-end developers moving to the backend.",
    language: "English",
    link: "/course/node",
    techStack: ["Node.js", "Express", "MongoDB"],
    duration: "3 months",
    level: "Beginner to Intermediate",
    rating: 4.9,
    reviews: 2000,
    lastUpdated: "September 2024",
    learnings: [
      "RESTful API development with Express",
      "Data management with MongoDB",
      "Asynchronous programming in Node.js",
      "Authentication and authorization",
    ],
    author: "Kaushal Kishor",
    image: "/node.png"
  },
  {
    id: "5",
    title: "Node.js Essentials (Hindi)",
    description: "Comprehensive Node.js course in Hindi. Learn to build RESTful APIs, manage databases with MongoDB, and set up Express.js routing. Perfect for beginners comfortable with Hindi.",
    language: "Hindi",
    link: "/course/node-hindi",
    techStack: ["Node.js", "Express", "MongoDB"],
    duration: "3 months",
    level: "Beginner to Intermediate",
    rating: 4.8,
    reviews: 2200,
    lastUpdated: "September 2024",
    learnings: [
      "API development with Express",
      "MongoDB for data persistence",
      "Authentication and session management",
      "Real-world project implementations",
    ],
    author: "Vikram Patel",
    image: "/node.png"
  },
];


// ----------------------------------------- Course Content Data -----------------------------------------




// Sample data for Course Content Section on React, Next.js, and Node.js

const courseContentData = [
  {
    sectionTitle: "Introduction to React",
    lectures: [
      { title: "What is React?", duration: "10m" },
      { title: "Setting up a React Environment", duration: "12m" },
      { title: "Understanding JSX", duration: "8m" },
      { title: "React Components and Props", duration: "15m" },
      { title: "State and Lifecycle", duration: "20m" },
    ],
  },
  {
    sectionTitle: "Intermediate React Concepts",
    lectures: [
      { title: "Handling Events in React", duration: "10m" },
      { title: "React Hooks: useState and useEffect", duration: "18m" },
      { title: "Context API and useContext", duration: "14m" },
      { title: "Optimizing Performance with useMemo and useCallback", duration: "20m" },
      { title: "Custom Hooks", duration: "15m" },
    ],
  },
  {
    sectionTitle: "Introduction to Next.js",
    lectures: [
      { title: "What is Next.js?", duration: "10m" },
      { title: "Creating Pages and Routes in Next.js", duration: "15m" },
      { title: "Static and Dynamic Routing", duration: "18m" },
      { title: "API Routes in Next.js", duration: "12m" },
      { title: "Using getStaticProps and getServerSideProps", duration: "25m" },
    ],
  },
  {
    sectionTitle: "Advanced Next.js Features",
    lectures: [
      { title: "Next.js Image Optimization", duration: "10m" },
      { title: "Custom App and Document in Next.js", duration: "15m" },
      { title: "Dynamic Imports and Code Splitting", duration: "18m" },
      { title: "Internationalization (i18n) with Next.js", duration: "20m" },
      { title: "Deploying a Next.js App", duration: "10m" },
    ],
  },
  {
    sectionTitle: "Node.js and Express Basics",
    lectures: [
      { title: "What is Node.js?", duration: "10m" },
      { title: "Setting up a Node.js Project", duration: "12m" },
      { title: "Introduction to Express.js", duration: "15m" },
      { title: "Building REST APIs with Express", duration: "20m" },
      { title: "Connecting to MongoDB", duration: "18m" },
    ],
  },
  {
    sectionTitle: "Building a Full-Stack Application",
    lectures: [
      { title: "Setting up the Frontend and Backend", duration: "15m" },
      { title: "Implementing Authentication with JWT", duration: "20m" },
      { title: "Creating Protected Routes in Next.js", duration: "18m" },
      { title: "CRUD Operations with MongoDB", duration: "22m" },
      { title: "Deploying the Full-Stack Application", duration: "25m" },
    ],
  },
];

export default courseContentData;


// ------------------------------------- Course Description Data -------------------------------------



const courseDescriptionData = [
  
]
