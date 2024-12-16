import { CircleCheck } from 'lucide-react'
import React from 'react'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'

function CardNetwork() {
  return (
    <div className="sec3 w-full grid grid-cols-1 lg:grid-cols-2 items-center my-10">
      
      <div className="first w-full flex flex-col lg:pl-20 gap-4 my-10">
        <span className="text-green-500 font-bold cursor-pointer text-lg sm:text-md">
          Real life Projects experience
        </span>
        <h1 className="text-3xl lg:text-6xl text-gray-200 font-bold leading-tight ">
          Personalized Project 
          & <br className="hidden sm:block" /> System Design Reviews
        </h1>
        
        <div className="w-full m-auto sm:m-0 mt-2 flex flex-col gap-2">
          <p className="text-md sm:text-lg font-bold text-orange-500 leading-relaxed pl-5">
            Get personalized projects tailored to your learning path, helping you build real-world applications. Receive expert system design reviews to improve your coding architecture and problem-solving skills.
          </p>
          <span className="flex gap-2 mt-4 ml-2 sm:ml-5 text-green-500">
            <IoCheckmarkCircleSharp className="text-green-500 text-2xl" /> 
            <span>Discuss new architecture & their work.</span>
          </span>
          <span className="flex gap-2 mt-3 ml-2 sm:ml-5 text-green-500">
            <IoCheckmarkCircleSharp className="text-green-500 text-2xl" /> 
            <span>
              Insights about problem-solving, getting hired, career growth, and more.
            </span>
          </span>
        </div>
      </div>

      <div className="second w-full flex">
        <img
          className="w-full sm:w-[90%] lg:w-[500px]  object-cover rounded-lg m-auto animate-pulse"
          src="/DisscussRbg.png"
          alt="Network Expansion Image"
        />
      </div>
    </div>
  )
}

export default CardNetwork
