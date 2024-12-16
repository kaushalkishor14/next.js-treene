import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter } from "lucide-react"

import { teamMembers } from "@/components/user-components/data"

export default function TeamPage() {
  return (
    <div className=" mx-auto mb-12">
      <header className="text-center mb-12 py-12 bg-gary-600 border border-gray-800 ">
        <h1 className="text-4xl font-bold mb-4 text-white">Our Team</h1>
        <p className="text-xl text-gray-400 dark:text-gray-300 max-w-2xl mx-auto">
          Meet the passionate individuals behind our success. Together, we're driving innovation and delivering excellence.
        </p>
      </header>

      <section className="mb-16 lg:w-[75%] m-auto px-5">
        <h2 className="text-2xl font-semibold mb-4 text-white ">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center bg-slate-900 text-gray-300 rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-800">
            <CardHeader>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">We constantly push boundaries and explore new ideas to stay ahead in the ever-evolving tech landscape.</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-slate-900 text-gray-300 rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-800">
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">We believe in the power of teamwork and foster an environment where diverse perspectives thrive.</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-slate-900 text-gray-300 rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-800">
            <CardHeader>
              <CardTitle>Customer Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Our clients' success is our success. We're dedicated to delivering solutions that exceed expectations.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="lg:w-[75%] m-auto px-5">
        <h2 className="text-2xl font-semibold mb-8 text-white">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="flex flex-col text-center bg-slate-900 text-gray-300 rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-800">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4 bg-gray-500">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center ">{member.name}</CardTitle>
                <CardDescription className="text-center">
                  <Badge variant="secondary" className="mt-2 text-gray-500 font-semibold">
                    {member.role}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-center text-gray-400">{member.bio}</p>
              </CardContent>
              <CardFooter className="justify-center space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5 text-orange-500" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 text-orange-500" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 text-orange-500" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}