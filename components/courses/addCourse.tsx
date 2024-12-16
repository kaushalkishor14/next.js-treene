"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  PlusCircle, X } from "lucide-react";
import { CourseFormData } from "@/types/course";
import {
  useUploadImageMutation,
  useAddCourseMutation,
} from "@/lib/features/course/api";
import { toast } from "sonner";

export default function CourseForm({
  initialData,
  onSubmit: handleFormSubmit,
}: {
  initialData?: CourseFormData;
  onSubmit?: (data: CourseFormData) => void;
}) {
  const [isEditing, setIsEditing] = useState(!!initialData);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    defaultValues: initialData || {
      image: "",
      name: "",
      description: "",
      username: "",
      startDate: "",
      endDate: "",
      language: "",
      price: 0,
      learningPoints: [],
      modules: [{ moduleName: "", tags: [""], lectures: [{ name: "" }] }],
      links: [{ key: "", url: "" }],
      imageUrl: "",
    },
  });

  const {
    fields: learningFields,
    append: appendLearning,
    remove: removeLearning,
  } = useFieldArray({ control, name: "learningPoints" });
  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({ control, name: "modules" });
  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({ control, name: "links" });

  const [uploadImage] = useUploadImageMutation();
  const [addCourse, { data, isLoading, error }] = useAddCourseMutation();

  const onSubmit = async (data: CourseFormData) => {
    if (isEditing) {
    } else {
      toast.info("Uploading file...");
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await uploadImage(formData).unwrap();
      if (response.status === 200) {
        toast.success(response.message);
        setValue("imageUrl", response.filePath);
        await addCourse(data);
      } else {
        toast.error(response.message);
      }
    }
    if (handleFormSubmit) {
      handleFormSubmit(data);
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days`;
    }
    return "Not set";
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.message);
    }
  }, [data, error]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Course" : "Add New Course"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2">Course Image</label>
              <Input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                  validate: (value: any) => {
                    if (value && value[0]) {
                      // Validate file type
                      if (!value[0].type.includes("image/")) {
                        return "File must be an image";
                      }
                      // Validate file size (e.g., 5MB)
                      if (value[0].size > 5 * 1024 * 1024) {
                        return "Image must be less than 5MB";
                      }
                    }
                    return true;
                  },
                })}
              />
            </div>
            {/* <div>
              <label className="block mb-2">Image URL</label>
              <Input type="url" placeholder="https://example.com/image.jpg" {...register('image' )} />
            </div> */}
          </div>
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
          <div>
            <label className="block mb-2">Course Name</label>
            <Input
              {...register("name", { required: "Course name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">Instructor Name</label>
            <Input
              {...register("username", {
                required: "Instructor name is required",
              })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Start Date</label>
              <Input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">End Date</label>
              <Input
                type="date"
                {...register("endDate", { required: "End date is required" })}
              />
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2">Course Duration</label>
            <Input value={calculateDuration()} readOnly />
          </div>

          <div>
            <label className="block mb-2">Course Language</label>
            <Controller
              name="language"
              control={control}
              rules={{ required: "Language is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.language && (
              <p className="text-red-500">{errors.language.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">Price</label>
            <Input
              type="number"
              {...register("price", { required: "Price is required", min: 0 })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">What You'll Learn</label>
            {learningFields.map((field, index) => (
              <div key={field.id} className="flex items-center mb-2">
                <Input
                  {...register(`learningPoints.${index}.point` as const, {
                    required: "Learning point is required",
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeLearning(index)}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendLearning({ point: "" })}
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add Learning Point
            </Button>
          </div>

          <div>
            <label className="block mb-2">Course Modules</label>
            {moduleFields.map((moduleField, moduleIndex) => (
              <div key={moduleField.id} className="border p-4 mb-4 rounded">
                <Input
                  {...register(`modules.${moduleIndex}.moduleName` as const, {
                    required: "Module name is required",
                  })}
                  placeholder="Module Name"
                  className="mb-2"
                />

                <div className="mb-2">
                  <label className="block mb-2">Tags</label>
                  <Controller
                    name={`modules.${moduleIndex}.tags` as const}
                    control={control}
                    render={({ field }) => (
                      <Input
                        value={field.value.join(", ")}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.split(",").map((tag) => tag.trim())
                          )
                        }
                        placeholder="Enter tags separated by commas"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block mb-2">Lectures</label>
                  <Controller
                    name={`modules.${moduleIndex}.lectures` as const}
                    control={control}
                    render={({ field }) => (
                      <>
                        {field.value.map((lecture, lectureIndex) => (
                          <div
                            key={lectureIndex}
                            className="flex items-center mb-2"
                          >
                            <Input
                              value={lecture.name}
                              onChange={(e) => {
                                const newLectures = [...field.value];
                                newLectures[lectureIndex] = {
                                  name: e.target.value,
                                };
                                field.onChange(newLectures);
                              }}
                              placeholder="Lecture Name"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => {
                                const newLectures = field.value.filter(
                                  (_, i) => i !== lectureIndex
                                );
                                field.onChange(newLectures);
                              }}
                              className="ml-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            field.onChange([...field.value, { name: "" }])
                          }
                        >
                          <PlusCircle className="h-4 w-4 mr-2" /> Add Lecture
                        </Button>
                      </>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeModule(moduleIndex)}
                  className="mt-2"
                >
                  Remove Module
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendModule({
                  moduleName: "",
                  tags: [],
                  lectures: [{ name: "" }],
                })
              }
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add Module
            </Button>
          </div>

          <div>
            <label className="block mb-2">Links</label>
            <div className="grid grid-cols-2">
              {linkFields.map((field, index) => (
                <div key={field.id} className="flex items-center mb-2">
                  <Input
                    {...register(`links.${index}.key` as const, {
                      required: "Key is required",
                    })}
                    placeholder="Link name (e.g., GitHub)"
                    className="mr-2 w-1/3"
                  />
                  <span className="mx-2">:</span>
                  <Input
                    {...register(`links.${index}.url` as const, {
                      required: "URL is required",
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: "Must be a valid URL starting with http(s)://",
                      },
                    })}
                    placeholder="https://example.com"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeLink(index)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => appendLink({ key: "", url: "" })}
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add Link
            </Button>
          </div>

          <div className="flex justify-end space-x-2">
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel Edit
              </Button>
            )}
            <Button type="submit">
              {isEditing ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
