"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react";
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  course: z.string().min(1, { message: "Please select a course." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  futureGoals: z.string().min(10, { message: "Please provide your future goals (minimum 10 characters)." }),
});

export default function CourseRegistrationForm({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      course: "",
      email: "",
      phone: "",
      futureGoals: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try{
      const response = await fetch("/api/course-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      
      if (response.ok) {
        const data = await response.json(); // Get the response data
        toast.success('Course registration successful!'); // Display success message        
        setIsOpen(false); // Close the dialog
      } else {
        const errorData = await response.json(); // Get error details
        toast.error(errorData.error); // Display error message
      }
  
      form.reset()
      setIsOpen(false)
    }catch(err){
      toast.error('Failed to register course'); // Return error response
      return toast.error('Failed to register course'); // Return error response
    }
  }

  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Course Registration</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Selection</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Full Stack Web Development">Full Stack Web Development</SelectItem>
                      <SelectItem value="Mobile Application Development">Mobile Application Development</SelectItem>
                      <SelectItem value="Freelancing Specialist">Freelancing Specialist</SelectItem>
                      <SelectItem value="Startup Specialist">Startup Specialist</SelectItem>
                      <SelectItem value="Government Internship Program">Government Internship Program</SelectItem>
                      <SelectItem value="TCS/Infosys/Wipro/HCL Job Program">TCS/Infosys/Wipro/HCL Job Program</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (WhatsApp preferred)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="futureGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Future Goal</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide your future goals sincerely. This will help us focus on your specific needs."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {
                form.formState.isSubmitting
                  ? <>
                    <Loader2 className="animate-spin" />
                  </>
                  : "Submit Registration"
              }
              </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
