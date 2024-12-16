import WhyTechTrail from "@/components/cadsection";
import Mentorship from "@/components/madeu";
import ExploreOur from "@/components/gameon";
import CardNetwork from "@/components/networkcard";
import CardCommunity from "@/components/cardcommunity";
import MentorCard from "@/components/mentorcard";
import CoursePreview from "@/components/user-components/CoursePreview";
import HeroSection from "@/components/user-components/HeroSection";
import { useEffect } from "react";

function Home() {
  return (
    <>
      <div className="w-full">
        <div className="w-full p-4 ">
          <HeroSection />
          <WhyTechTrail />
          <ExploreOur />
          <MentorCard />
          <Mentorship />
          <CardNetwork />
          <CardCommunity />
        </div>
        <CoursePreview />
      </div>
    </>
  );
}

export default Home;