import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useAuth from '@/hooks/useAuth';
import { RegisterInput, registerSchema } from '@/schema/register.schema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from '@/lib/axios';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const Register = () => {
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterInput) => {
    try {
      setIsLoading(true);
      const resp = await axios.post('/users', JSON.stringify(values), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setIsLoading(false);
      setAuth({
        user: resp.data.data.respUser,
        accessToken: resp.data.data.accessToken,
      });
      navigate('/', { replace: true });
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 409) {
        setErrMsg('Account already exists');
      } else {
        setErrMsg('Login Failed');
      }
      toast({
        variant: 'destructive',
        title: 'Register Failed',
        description: errMsg,
      });
    }
  };

  return (
    <div className="grid grid-cols-2 mx-52">
      <div className="col-span-1 flex flex-col items-center justify-center gap-y-2">
        <div className="w-9/12">
          <img
            src="https://images.tokopedia.net/img/content/register_new.png"
            alt="Tokopedia register background"
          />
        </div>
        <h2 className="font-semibold text-2xl">
          Jual Beli Mudah Hanya di Tokopedia
        </h2>
        <p className="text-gray-400">
          Gabung dan rasakan kemudahan bertransaksi di Tokopedia
        </p>
      </div>
      <div className="col-span-1 flex justify-center">
        <Form {...form}>
          <form
            className="bg-white drop-shadow-md flex flex-col items-center w-[400px] px-10 py-5 gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-3xl font-bold">Daftar Sekarang</h1>
              <div className="flex items-center space-x-1">
                <p>Sudah punya akun Tokopedia?</p>
                <Link to={'/login'}>
                  <span className="text-green-600 font-semibold">Masuk</span>
                </Link>
              </div>
            </div>
            <Button
              className="flex items-center gap-x-3 w-full"
              variant={'outline'}
            >
              <Icon name="google" />
              <span>Google</span>
            </Button>
            <div className="grid grid-cols-4 items-center w-full gap-x-1">
              <Separator className="col-span-1" />
              <div className="col-span-2 text-center text-sm text-gray-400">
                atau daftar dengan
              </div>
              <Separator className="col-span-1" />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-green-600 focus-visible:ring-offset-0 focus-visible:ring-1"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-green-600 focus-visible:ring-offset-0 focus-visible:ring-1"
                      placeholder="user@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-green-600 focus-visible:ring-offset-0 focus-visible:ring-1 pl-10"
                      placeholder="*****"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-green-600 focus-visible:ring-offset-0 focus-visible:ring-1 pl-10"
                      placeholder="*****"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-green-600 w-full hover:bg-green-700 font-bold"
            >
              {isLoading ? <Icon name="loading" /> : <span>Daftar</span>}
            </Button>
            <div className="text-center text-gray-400 text-sm">
              <p>Dengan mendaftar, saya menyetujui</p>
              <div className="flex space-x-1">
                <Link to={'https://www.tokopedia.com/terms'}>
                  <span className="text-green-600 font-semibold">
                    Syarat dan Ketentuan
                  </span>
                </Link>
                <p>serta</p>
                <Link to={'https://www.tokopedia.com/privacy'}>
                  <span className="text-green-600 font-semibold">
                    Kebijakan Privasi
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
