import { CircleCheck } from "lucide-react";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

function CardCommunity() {
  return (
    <div className="section4 m-auto">
      {/* First Section */}
      <div className="first w-full my-5">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="img flex flex-col items-center justify-center w-full mt-4">
            <img
              className="lg:w-[500px] w-full object-cover rounded-lg animate-pulse"
              src="/intershiptry1.png"
              alt="Masterclass"
            />
          </div>
          <div className="first w-full flex flex-col lg:pl-20 gap-4 my-10">
            <span className="text-green-500 font-bold cursor-pointer text-lg sm:text-md">
              Real-world Projects experience
            </span>
            <h1 className="text-3xl lg:text-5xl text-gray-200 font-bold leading-tight ">
              Internship offer to Top performers guarantee <br className="hidden sm:block" /> &  
              with perks and stipend.
            </h1>

            <div className="w-full m-auto sm:m-0 mt-2 flex flex-col gap-2">
              <p className="text-md sm:text-lg font-bold text-orange-500 leading-relaxed pl-5">
                Top performers are guaranteed internship offers with exciting perks, including stipends, exclusive goodies, and access to special meetups with industry professionals. Boost your career while enjoying these benefits!
              </p>
              <span className="flex gap-2 mt-4 ml-2 sm:ml-5 text-green-500">
                <IoCheckmarkCircleSharp className="text-green-500 text-2xl" />
                <span>Learn diverse technologies and explore multiple tech domains to expand your industry-relevant skills.</span>
              </span>
              <span className="flex gap-2 mt-3 ml-2 sm:ml-5 text-green-500">
                <IoCheckmarkCircleSharp className="text-green-500 text-2xl" />
                <span>
                  Insights about problem-solving, getting hired, career growth,
                  and more.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCommunity;
