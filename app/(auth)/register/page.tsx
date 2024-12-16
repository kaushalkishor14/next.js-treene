'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm , SubmitHandler } from 'react-hook-form';
import { registerForm } from '@/types/auth';
import { useRegisterMutation } from '@/lib/features/Auth/api';
import { setCredentials } from '@/lib/features/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store/store';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [registerUser, {isLoading, data}] = useRegisterMutation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {register, handleSubmit, reset} = useForm<registerForm>();


  const onSubmit = async(data:registerForm) => {
    const registerData = {
      fullName : data.firstName+" "+ data.lastName,
      email : data.email,
      password : data.password
    }
    const result = await registerUser(registerData).unwrap();
    if(result.data){  
      dispatch(setCredentials({accessToken : result.data}));
      router.push('/');
    }
    reset();
  }


  return (
    <div className='w-full lg:grid lg:grid-cols-2 h-screen'>
      <div className='flex items-center justify-center py-12'>
        <Card className='mx-auto grid w-[350px] gap-6 border-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Register</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <div>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='first-name'>First name</Label>
                  <Input 
                    {...register('firstName')}
                    id='first-name' 
                    placeholder='Max' 
                    required />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='last-name'>Last name</Label>
                  <Input
                    {...register('lastName')} 
                    id='last-name' 
                    placeholder='Robinson' 
                    required />
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...register('email')}
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  {...register('password')} 
                  id='password' 
                  type='password' />
              </div>
              <Button type='submit' className='w-full'>
                Create an account
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link href='/login' className='underline'>
                Sign in
              </Link>
            </div>
          </div>
          </form>
        </Card>
      </div>
      <div className='hidden bg-muted lg:block'>
        <Image
          src='/placeholder.svg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}
