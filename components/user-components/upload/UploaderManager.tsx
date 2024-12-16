"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, FolderOpen, Copy, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useUploadImageMutation } from "@/lib/features/course/api";

interface ImageItem {
  name: string;
  path: string;
}

export default function ImageManager() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadImage] = useUploadImageMutation();
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/dashboard/image-manager/api/images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch images");
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log(file);
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadImage(formData).unwrap();
      console.log(response);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imagePath: string, name: string) => {
    try {
      const response = await fetch("/dashboard/image-manager/api/images", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath: name }),
      });
      if (response.ok) {
        setImages((prevImages) =>
          prevImages.filter((image) => image.path !== imagePath)
        );
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Image Manager</h2>
        <div className="flex items-center gap-4">
          <label htmlFor="image-upload" className="cursor-pointer">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              accept="image/*"
              className="hidden"
              id="image-upload"
            />
            <Button
              onClick={handleButtonClick}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-200 hover:scale-105"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            {selectedFile && (
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                <div className="relative w-8 h-8">
                  <ImageIcon className="text-gray-400 dark:text-gray-600 absolute inset-0" />
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="text-sm font-medium truncate max-w-[150px]">
                  {selectedFile.name}
                </span>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images?.map((image) => (
          <Card key={image.path} className="p-4">
            <div className="relative aspect-square mb-4">
              <Image
                src={image.path}
                alt={image.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium truncate" title={image.name}>
                {image.name}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground py-2">
                <span className="flex items-center text-sm text-muted-foreground py-2">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <span className="truncate" title={image.path}>
                    {image.path}
                  </span>
                </span>
                <Copy
                  onClick={() => {
                    navigator.clipboard.writeText(image.path),
                      toast.success("Copied");
                  }}
                  className="ml-2 h-5 w-5 hover:text-gray-400"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => handleDelete(image.path, image.name)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No images uploaded yet. Upload your first image to get started.
        </div>
      )}
    </div>
  );
}
