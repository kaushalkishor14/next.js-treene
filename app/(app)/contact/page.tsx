"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, BadgeDollarSign } from "lucide-react";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';


type formData = {
  name: string;
  email: string;
  subject: string;
  message: string;
}


export default function ContactPage() {
  // const { register, handleSubmit, reset, formState: { errors } } =useForm();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<formData>();

  const onSubmit = async (data:any) => {
    console.log(data, "Form submitted.");

    try {
      const response = await axios.post("/contact/resend/api", data);
     toast.success("Message sent successfully");
      reset();
    } catch (error: any) {
     toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mx-auto pb-12">
      <header className="text-center mb-4 py-12 border border-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Meet the passionate individuals behind our success. Together, we're driving innovation and delivering excellence.
        </p>
      </header>
      <div className='py-5 bg-orange-200 my-7'>
        <div className='flex gap-7 items-center w-full m-auto container text-center justify-center flex-wrap'>
          <b className="text-red-600 italic text-base animate-pulse-text">Diwali Offer Hurry Up</b>
          <BadgeDollarSign className='animate-pulse-text' />
          <p className='font-bold text-gray-600 text-lg animate-pulse-text'>Earn 10% to 20% commission by bringing clients to us!</p>
          <p className='text-md font-semibold pl-2 text-gray-600'>Click Below WhatsApp</p>
          <p className='font-bold text-gray-600 text-lg animate-pulse-text'>fast</p>
        </div>
      </div>
      <div className="lg:w-[75%] grid grid-cols-1 md:grid-cols-2 gap-8 m-auto px-5">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your name" 
                  />
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    {...register("email", { required: "Email is required" })}
                    placeholder="Your Email" 
                  />
                  {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject"
                    {...register("subject", { required: "Subject is required" })}
                    placeholder="Subject"
                  />
                  {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message" 
                    {...register("message", { required: "Message is required" })}
                    placeholder='Your Message'
                  />
                  {errors.message && <span className="text-red-500">{errors.message.message}</span>}
                </div>
              </div>
              <CardFooter className="flex gap-2 mt-4">
                <Button type="submit" className='bg-orange-500 font-semibold'>Send Message</Button>
                <Link 
                  href={"https://api.whatsapp.com/send/?phone=7055532539&text&type=phone_number&app_absent=0"}
                  className='bg-green-500 font-semibold p-2 rounded text-white hover:bg-green-600'
                >
                  WhatsApp
                </Link>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Here's how you can reach us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>123 Tech Lane, Bareilly City, 243001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+ (91) 7055532539</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>surajsinhaking717@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Monday - Friday: 9am - 5pm</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground" />
                <span className="sr-only">Map placeholder</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
