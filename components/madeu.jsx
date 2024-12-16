import { CircleCheck } from "lucide-react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

function MadeForYou() {
  return (
    <div className="sec3 w-full grid grid-cols-1 lg:grid-cols-2 m-auto my-14 items-center justify-between">
      <div className="first w-full flex flex-col items-center gap-2">
        <span className="text-green-500 font-bold flex flex-col my-4">
          Made For You
        </span>
        <h1 className="text-3xl sm:text-6xl font-bold text-foreground text-gray-200">
          Mentorship And <br className="hidden sm:block" />
          Personal Feedback
        </h1>
        <div className="w-full sm:w-[490px] m-auto">
          <p className="text-md sm:text-lg font-bold text-orange-500 leading-relaxed">
            Get personalized mentorship and one-on-one feedback throughout your coding journey. Enhance your skills with tailored guidance and insights to help you grow faster and achieve your goals.
          </p>
          <div className="flex flex-col gap-4 mt-5">
            <span className="flex gap-2">
              <IoCheckmarkCircleSharp className="text-green-500 text-2xl" /> 
              <span className=" text-green-500">
                Get tailored guidance to boost your coding skills and career decisions.
              </span>
            </span>
            <span className="flex gap-2">
              <IoCheckmarkCircleSharp className="text-green-500 text-2xl" /> 
              <span className="text-green-500">
                Get mentorship to grow as a coder and find the best learning approach for you.
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-16 pt-10">
        <img
          className="w-full sm:w-[90%] lg:w-[430px]  object-cover rounded-lg shadow-lg animate-bounce"
          src="/onlinemeet3.jpg"
          alt="Mentorship Zoom"
        />
      </div>
    </div>
  );
}

export default MadeForYou;
