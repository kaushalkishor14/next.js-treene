import { IoCheckmarkCircleSharp } from "react-icons/io5"; // Import tick/checkmark icon

function MentorCard() {
  return (
    <div className="w-full mx-auto flex flex-col gap-12 p-6 sm:px-16">
      
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-5xl text-gray-200 font-bold">
          Why You Should Choose Our Course
        </h1>
      </div>
      
      
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Text Features Section with Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Feature 1 */}
          <div className="flex items-start gap-2 p-4">
            <IoCheckmarkCircleSharp  className="text-green-500 text-2xl" />
            <div className="text-white flex flex-col gap-1">
              <h2 className="text-xl font-bold">Share Your Certificate letter</h2>
              <p className="text-sm text-orange-400 italic">
              A Share Certificate confirms ownership, a Course Certificate marks completion, and a LinkedIn Recommendation endorses skills.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-2 p-4 ">
            <IoCheckmarkCircleSharp className="text-green-500 text-2xl" />
            <div className="text-white flex flex-col gap-1">
              <h2 className="text-xl font-bold">24/7 Teaching Assistance</h2>
              <p className="text-sm text-orange-400 italic">
                24/7 Teaching Assistance provides round-the-clock support to help learners with their questions and academic needs anytime
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-2 p-4">
            <IoCheckmarkCircleSharp className="text-green-500 text-2xl" />
            <div className="text-white flex flex-col gap-1">
              <h2 className="text-xl font-bold">Earn in Collage</h2>
              <p className="text-sm text-orange-400 italic">
                Earn in College by exploring freelancing or starting a small business, turning skills into income while studying.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-2 p-4 ">
            <IoCheckmarkCircleSharp  className="text-green-500 text-2xl" />
            <div className="text-white flex flex-col gap-1">
              <h2 className="text-xl font-bold">Startup Incubation</h2>
              <p className="text-sm text-orange-400 italic">
                Empower your entrepreneurial spirit with our startup incubation program for students.
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Image Section */}
        <div className="w-full flex justify-center">
          <img
            src="cer.jpeg"
            alt="Certificate"
            className="w-[350px] h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        
      </div>
    </div>
  );
}

export default MentorCard;
