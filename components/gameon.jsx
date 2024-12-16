import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesCard from "@/components/user-components/coursecard";
import CoursesHindiCard from "@/components/user-components/coursehindicard";

function CardGameOn() {
  return (
    <div className="sec3 w-full lg:w-full m-auto flex flex-col items-center justify-between my-10">
      {/* Heading Section */}
      <h1 className="text-3xl lg:text-6xl md:text-4xl font-bold text-gray-300 mb-8 text-center ">
        Explore Our Courses
      </h1>
      
      <Tabs defaultValue="hindi" className=" py-10 px-2 w-full lg:px-28">
        {/* Tabs for Language Selection */}
        <TabsList className="grid w-full grid-cols-2 bg-orange-400 rounded-md mb-4">
          
          <TabsTrigger
            value="hindi"
            className="text-white font-semibold bg-orange-400 hover:bg-orange-500 transition-colors duration-300"
          >
            Hindi
          </TabsTrigger>
          <TabsTrigger
            value="english"
            className="text-white font-semibold bg-orange-400 hover:bg-orange-500 transition-colors duration-300"
          >
            English
          </TabsTrigger>
        </TabsList>
        
        {/* Courses Content */}
        <TabsContent value="english">
          <CoursesCard />
        </TabsContent>
        <TabsContent value="hindi">
          <CoursesHindiCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CardGameOn;
