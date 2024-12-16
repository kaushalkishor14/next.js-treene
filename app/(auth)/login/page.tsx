"use client";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { register, handleSubmit } = useForm<LoginFormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/login/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Login failed');
            }

            localStorage.setItem('token', result.token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-screen bg-gray-900">
            <div className="flex items-center justify-center py-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold text-white">Login</h1>
                            <p className="text-gray-400">
                                Enter your email below to log in to your account
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-400 font-semibold text-lg">Email</Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-gray-400 font-semibold text-lg">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input {...register('password')} id="password" type="password" required />
                            </div>
                            <Button disabled={isLoading} type="submit" className="w-full bg-orange-400 hover:bg-orange-500">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span className="ml-2">Loading...</span>
                                    </>
                                ) : "Login"}
                            </Button>
                        </div>
                        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
                        <div className="mt-4 text-center text-sm text-gray-400 font-semibold">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className="hidden bg-muted lg:block">
                {/* Add an image for the right side (if needed) */}
                <img
                src='/cover.png'
                alt="Cover"
                className='w-full h-full object-cover'
                />
            </div>
        </div>
    );
};

export default LoginPage;
