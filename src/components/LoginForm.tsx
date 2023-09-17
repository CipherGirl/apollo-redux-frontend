'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { loginUser, signInWithGoogle } from '@/Redux/features/user/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.email && !isLoading) {
      if (location.state?.path) {
        navigate(location.state.path);
      } else {
        navigate('/');
      }
    }
  }, [user.email, isLoading, location.state, navigate]);

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
          </div>
          <Button>Login with email</Button>
        </div>
      </form>
      <span className="p-2 text-muted-foreground text-xs">
        Or continue with
      </span>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between w-full relative"
        onClick={() => handleGoogleSignIn()}
      >
        <p>Google</p>
        <img src="/images/google.png" className="absolute w-[7%] right-4" />
      </Button>
    </div>
  );
}
