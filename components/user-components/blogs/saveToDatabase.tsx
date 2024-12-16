'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// ---------------------------------------State import ---------------------------------------
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAddBlogMutation } from '@/lib/features/blog/api';
import { Loader2 } from 'lucide-react'

export default function Component({ children, block, setBlocks}: {children: React.ReactNode, block: any, setBlocks: any}) {

  const { register, handleSubmit,formState:{errors}, reset } = useForm();
  const [open, setOpen] = useState(false)
  const [createBlog, {isLoading}] = useAddBlogMutation();

  const Submit = async (data:any) => {
    try{
      const {title, author} = data;
      const response = await createBlog({title, author, blocks: block}).unwrap();
      if(response.status === 200){
        toast.success('Blog saved successfully');
        reset();
        setBlocks([]);
        setOpen(false);
        localStorage.removeItem('blog-content');
        return;
      }
      throw new Error(response?.message);
    }catch(err){
      toast.error((err as any)?.data?.message);
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Blog</DialogTitle>
          <DialogDescription>
            Enter the details of the new book. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(Submit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                {...register('title',{required: "Title is required"})}
                className="col-span-3"
              />
              {errors.title?.message && <span className="text-red-500 col-span-3"> {errors.title.message as string} </span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                className="col-span-3"
                {...register('author',{required: "Author is required"})}
              />
              {errors.author?.message && <span className="text-red-500 col-span-3"> {errors.author.message as string} </span>}
            </div>
          </div>
          <Button type="submit" 
            disabled={isLoading}
            >
            {
              isLoading ? <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
              </> : 'Save to Database'

            }
          </Button>
        </form>
        {/* <DialogFooter>
          <Button type="submit">Save to Database</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}