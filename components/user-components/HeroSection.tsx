import { Medal } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


function HeroSection(){
    return(

        <div className="w-full grid lg:grid-cols-2 gap-8 p-4 items-center lg:py-10 justify-evenly">
        <div className="flex flex-col items-center lg:items-start gap-6 p-2 lg:pl-20 ">
          <h1 className="font-bold  text-white lg:text-5xl text-3xl lg:leading-tight  leading-tight">
            Want to{" "} 
            <span className="underline underline-offset-6 decoration-yellow-600 animate-pulse text-green-400 ">
              earn{" "} 
            </span>
            by coding? Transform your
            <br />
            <span className="underline underline-offset-6 decoration-green-600 orange animate-pulse text-orange-500 duration-1000">
              skills{" "}
            </span>
            and begin your journey today!
          </h1>
          <span className="text-green-500 font-semibold text-md flex gap-2 items-center">
            <Medal className="text-yellow-600 animate-spin" />
            <p className="animate-bounce">
              Internship offers and perks await you!
            </p>
          </span>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <Link
              href="/courses"
              className="text-xl font-semibold bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-transform transform flex items-center"
            >
              <span>Courses</span>
              <ArrowRight className="inline ml-2 transition-all ease-in-out transform hover:translate-x-2 animate-in" />
            </Link>

            <span className="text-sm flex text-gray-300 font-bold lg:text-xs animate-pulse">
              Enrollments for spring are closed.
              <br />
              Applications open fall 2024.
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center">
          <img
            className="w-[70%] lg:w-[60%] h-auto rounded-lg  object-cover "
            src="hero2.png"
            alt="Design School"
          />
        </div>
      </div>
    )
}

export default HeroSection;