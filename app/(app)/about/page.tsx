
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code, Smartphone, Globe, Palette, BarChart, MessageSquare, Users } from "lucide-react"

export default function AboutPage() {
  const services = [
    { name: "Website Development", icon: Globe, description: "Custom-built, responsive websites tailored to your brand and goals." },
    { name: "Online Store Creation", icon: Code, description: "E-commerce solutions that drive sales and enhance customer experience." },
    { name: "Mobile App Development", icon: Smartphone, description: "Native and cross-platform apps that engage users on-the-go." },
    { name: "UI/UX Design", icon: Palette, description: "Intuitive and visually appealing designs that delight users." },
    { name: "Digital Strategy", icon: BarChart, description: "Data-driven strategies to boost your online presence and ROI." },
    { name: "Social Media Management", icon: MessageSquare, description: "Engaging content and community management across platforms." },
    { name: "Account Management", icon: Users, description: "Dedicated support to ensure long-term success and satisfaction." }
  ]

  const stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Happy Clients", value: "200+" },
    { label: "Team Members", value: "50+" },
    { label: "Years in Business", value: "10+" }
  ]

  return (
    <div className=" mx-auto pb-12 ">
      <header className="text-center mb-12 border border-gray-800 w-full py-12">
        <h1 className="text-4xl font-bold mb-4 text-white">About Tech Trail</h1>
        <p className="text-xl text-gray-400 dark:text-gray-300 max-w-3xl mx-auto">
          Illuminating the digital landscape with innovative solutions and cutting-edge technology.
        </p>
      </header>

      <section className="mb-16 lg:w-[75%] m-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-white">Our Mission</h2>
            <p className="text-lg mb-4 text-gray-400">
              At LightUp Labs, we're on a mission to empower businesses with transformative digital solutions. We blend creativity, technology, and strategy to illuminate your path to success in the digital world.
            </p>
            <p className="text-lg mb-4 text-gray-400">
              Our team of passionate experts is dedicated to crafting bespoke solutions that not only meet but exceed your expectations, ensuring your business shines bright in the competitive digital landscape.
            </p>
            <Button size="lg" className="mt-4 bg-orange-400 hover:bg-orange-500 font-semibold">Learn  More About Us</Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {/* <img
              src="/placeholder.svg?height=400&width=600"
              alt="LightUp Labs Team"
              className="object-cover w-full h-full"
            /> */}
          </div>
        </div>
      </section>

      <section className="mb-16 container m-auto px-10">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-slate-900 text-gray-300 rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-800">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <service.icon className="h-6 w-6 text-primary" />
                  <CardTitle>{service.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16  py-12 rounded-lg container m-auto border bg-gray-900  border-gray-800  px-4">
        <div className="text-center mb-8  py-12">
          <h2 className="text-3xl font-semibold mb-4 text-white">Why Choose TechTrail?</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            We bring together expertise, innovation, and a client-first approach to deliver exceptional results.
          </p>
        </div>
        <Tabs defaultValue="expertise" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 ">
            <TabsTrigger value="expertise" className="font-semibold">Expertise</TabsTrigger>
            <TabsTrigger value="innovation" className="font-semibold">Innovation</TabsTrigger>
            <TabsTrigger value="clientfocus" className="font-semibold">Client Focus</TabsTrigger>
          </TabsList>
          <TabsContent value="expertise">
            <Card>
              <CardHeader>
                <CardTitle>Unparalleled Expertise</CardTitle>
                <CardDescription>Our team consists of industry veterans and rising stars.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>With decades of combined experience, our experts bring deep knowledge and skills to every project. We stay at the forefront of technology trends, ensuring you receive cutting-edge solutions that drive your business forward.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="innovation">
            <Card>
              <CardHeader>
                <CardTitle>Innovative Solutions</CardTitle>
                <CardDescription>We push boundaries to create unique, effective solutions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Innovation is at the heart of what we do. We constantly explore new technologies and methodologies to deliver solutions that not only meet current needs but anticipate future challenges, keeping your business ahead of the curve.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="clientfocus">
            <Card>
              <CardHeader>
                <CardTitle>Client-Centric Approach</CardTitle>
                <CardDescription>Your success is our top priority.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>We believe in building lasting partnerships with our clients. Our approach is collaborative, transparent, and focused on your unique needs. We're not just service providers; we're your dedicated partners in digital success.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-16 container m-auto px-10">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-slate-900 text-gray-300 rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-800">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary text-white">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center container m-auto px-5">
        <h2 className="text-3xl font-semibold mb-4 text-white">Ready to Light Up Your Digital Presence?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400">
          Let's collaborate to create innovative solutions that will make your business shine in the digital world.
        </p>
        <Button size="lg" className="bg-orange-400 hover:bg-orange-500 font-semibold">Get in Touch</Button>
      </section>
    </div>
  )
}