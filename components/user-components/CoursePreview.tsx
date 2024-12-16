import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {courseModules} from "../user-components/data";
import CourseRegistrationForm from "./CourseRegister";


const Data = [
    {
      module: courseModules[0].module,
        topics: [
          courseModules[0].topics[0],
          courseModules[0].topics[1],
          courseModules[0].topics[2],
          courseModules[0].topics[3],
          courseModules[0].topics[4],
          courseModules[0].topics[6],
          courseModules[0].topics[7],
        ],
        tag: courseModules[0].tag
    },
    {
      module: courseModules[1].module,
        topics: [
          courseModules[1].topics[0],
          courseModules[1].topics[1],
          courseModules[1].topics[2],
          courseModules[1].topics[4],
          courseModules[1].topics[6],
          courseModules[1].topics[7],
          courseModules[1].topics[8],
          courseModules[1].topics[11],
        ]
      ,
      tag: courseModules[1].tag
    },
    {
      module: courseModules[2].module,
      topics: [
        courseModules[2].topics[0],
        courseModules[2].topics[1],
        courseModules[2].topics[2],
        courseModules[2].topics[3],
        courseModules[2].topics[4],
        courseModules[2].topics[5],
        courseModules[2].topics[6],
      ],
      tag: courseModules[2].tag
    },
    {
      module: courseModules[3].module,
      topics: [
        courseModules[3].topics[0],
        courseModules[3].topics[1],
        courseModules[3].topics[2],
        courseModules[3].topics[3],
        courseModules[3].topics[4],
        courseModules[3].topics[6],
        courseModules[3].topics[7],
        courseModules[3].topics[8],
      ],
      tag: courseModules[3].tag
    },
    {
      module: courseModules[4].module,
      topics: [
        courseModules[4].topics[0],
        courseModules[4].topics[1],
        courseModules[4].topics[2],
        courseModules[4].topics[3],
        courseModules[4].topics[4],
        courseModules[4].topics[6],
        courseModules[4].topics[7],
      ],
      tag: courseModules[4].tag
    }
  ];

function CoursePreview() {


  return (
    <div className="w-full m-auto my-10 p-4 sm:px-16">
          {/* Header Section */}
          <div className="text-center sm:text-left flex flex-col gap-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-200">
              Full Stack Web Development / Mobile App Development
            </h1>
            <span className="text-md sm:text-lg lg:text-xl text-green-500 font-bold mt-4 mx-auto sm:mx-0 leading-relaxed">
            Our Full Stack Web and Mobile App Development training equips you with the skills to become &nbsp;  
             <span className="text-orange-500 font-semibold">job</span>, <span className="text-orange-500 font-semibold">freelancing </span>, or <span className="text-orange-500 font-semibold"> startup </span> ready. Gain hands-on experience in building dynamic web and mobile applications, preparing you for real-world opportunities.
            </span>
          </div>

          {/* What You'll Get Section */}
          <div className="grid lg:grid-cols-6  mt-8 gap-16 lg:h-[900px] py-10">
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-orange-500 mb-4 underline decoration-green-500 underline-offset-4">
                  What You'll Get
                </h2>
                <ul className="space-y-4 text-orange-100 italic">
                  {[
                    "24/7 Teaching Assistance" ,
                    "Live and Recorded Lectures",
                    "Personalized Mentorship",                    
                    "Exclusive Internship Opportunities",
                    "Learn from Industry Experts",
                    "Hands-on Industrial Projects",
                    "Career-Ready Focus",
                    "Fun Activities and Meetups",
                    "Lifetime Community Access",
                    "Certification",
                    "Job Placement Assistance",
                    "Startup Incubation",
                    "Freelancing Opportunities",
                    "Top Performer Rewards and Internship Offers",
                    "Perks, Goode and Discounts",
                  ].map((item, index) => (
                    <li className="flex items-start gap-2" key={index}>
                      <IoCheckmarkCircleSharp className="text-green-500 text-lg" />
                      <span className="text-white text-md">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-foreground flex flex-col">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Join Now Free Masterclass <span className="text-xl font-bold text-red-500">
                  Free
                </span>
                </h2>
                
                <span className="mt-4 font-bold leading-relaxed text-gray-200">
                  Price may change for future cohorts. This Winter 2024 cohort
                  is currently underway. Fill out the form for notifications
                  about the next batch in fall 2024.
                </span>
                <CourseRegistrationForm>
                  <Button className="mt-5 w-fit">
                    Request Invite
                  </Button>
                </CourseRegistrationForm>
              </div>
            </div>

            {/* Second Section (Cards) */}
            <div className="second w-full flex flex-col gap-4 lg:col-span-2 overflow-y-auto">
              {Data.map((item, index) => (
                  <div
                    key={index}
                    className="w-full p-6 rounded-lg bg-gray-800 text-white shadow-lg flex flex-col gap-2"
                  >
                    <span className="text-lg font-bold sm:text-sm mb-2 capitalize text-green-500">
                    Month {index+1} &nbsp; 
                      <span>  
                        {item.tag.map((tag, index) => (
                          <Badge key={index} color="green" className="mr-1 bg-white text-gray-800 hover:bg-orange-500 hover:text-white">
                            {tag}
                          </Badge>
                        ))}  
                      </span> 
                    </span>
                    <h1 className="text-2xl font-bold text-orange-500">
                      {item.module}
                    </h1>
                    <ol type="1" className="pl-7 text-base font-semibold my-3">
                      {item.topics.map((topic, index) => 
                        <li className="list-disc" key={index}> {topic?.name} </li>
                      )}
                    </ol>
                  </div>
                ))}
            </div>
          </div>
        </div>
  );
}

export default CoursePreview;