import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Login() {
  return (
    <>
      <div className="container h-[calc(100vh-148px)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className='text-center'>
              Don't have account? Click here to
              <span className="ps-1">
                <Link
                  to="/signup"
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'm-0 p-0 underline'
                  )}
                >
                  Signup
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
