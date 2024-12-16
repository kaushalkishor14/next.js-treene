import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ResetPassword() {
  return (
    <div className='mx-auto max-w-md space-y-6 h-screen flex flex-col items-center justify-center w-full'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Reset Password</h1>
        <p className='text-muted-foreground'>
          Enter a new password for your account.
        </p>
      </div>
      <Card className='border-0 max-w-lg w-full'>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='password'>New Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='Enter new password'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='Confirm new password'
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full'>
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
