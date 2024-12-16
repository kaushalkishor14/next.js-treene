"use client";
import AddCourse from "@/components/courses/addCourse";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
  const router = useRouter();

  return (
    <div>
      <div className="py-4">
        <Button onClick={() => router.back()}>
          <ArrowLeft color="white" className="" />
        </Button>
      </div>
      <AddCourse />
    </div>
  );
}
