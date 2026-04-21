'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { useEffect, useTransition } from 'react';
import { login } from '@/lib/actions/auth.action';
import { LoginInput, loginSchema } from '@/lib/schemas/auth.schema';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowRight, Loader } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/shared/logo';
import Link from 'next/link';

const DEMO_ACCOUNTS = [
  { label: 'Try as Admin', email: 'admin1@test.com', password: '123456', color: 'bg-purple-500 hover:bg-purple-600' },
  { label: 'Try as Teacher', email: 'teacher5@test.com', password: '123456', color: 'bg-emerald-500 hover:bg-emerald-600' },
  { label: 'Try as Parents', email: 'parent3@test.com', password: '123456', color: 'bg-orange-500 hover:bg-orange-600' },
];

export default function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();
  const { update, data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;
    const role = session?.user?.role;
    if (role === 'TEACHER') router.push('/students');
    else if (role === 'ADMIN' || role === 'SUPER_ADMIN')
      router.push('/dashboard');
    else if (role === 'PARENTS') router.push('/parents/student-info');
    else router.push('/dashboard');
  }, [status, session, router]);

  const [isPending, startTransition] = useTransition();

  const fillAndLogin = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 0);
  };

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const res = await login(data);
      if (!res.success) {
        toast.error('Username or password is incorrect');
        return;
      }
      update();
    });
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-cente px-3">
        <Card className="w-120 max-w-sm rounded-4xl px-2 bg-linear-to-b from-blue-400/50 via-blue-100/50 to-white/50 shadow-[0_0_60px_rgba(59,130,246,0.5)]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="mt-3">
              <CardTitle className="font-bold">
                <div className="flex flex-col gap-4 ">
                  <div className="flex justify-center text-md">
                    <Logo />
                  </div>
                  <div className="flex flex-col gap-2 text-xl items-center text-center">
                    <p className="text-blue-600">Login to iSchool</p>
                    <p className="mb-2">AI Insight</p>
                  </div>
                </div>
              </CardTitle>
              <CardDescription className="flex text-muted-foreground justify-center">
                Welcome back to the Future of Learning
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-2">
              <p className="text-xs text-center text-muted-foreground mb-2">Live Demo</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.label}
                    type="button"
                    onClick={() => fillAndLogin(acc.email, acc.password)}
                    disabled={isPending}
                    className={`text-xs text-white px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer disabled:opacity-50 ${acc.color}`}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>
            <CardContent className="mt-6">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-chart-3">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter you email"
                    {...register('email')}
                    autoComplete="name"
                    className="rounded-xl bg-accent text-gray-900 placeholder:text-gray-400"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-md text-left">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-chart-3">Password</Label>
                    <Link
                      href="/password/forgetpassword"
                      className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    autoComplete="email"
                    className="rounded-xl bg-accent text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter you password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-md text-left">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-center gap-4 mt-8 mb-4">
              <Button type="submit" className="w-80" disabled={isPending}>
                {isSubmitting ? <Loader className="animate-spin" /> : 'Login'}
                <ArrowRight className="font-semibold" />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </motion.div>
  );
}
