import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import axios from '@/lib/axios';
import { LoginInput, loginSchema } from '@/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values: LoginInput) => {
    try {
      setIsLoading(true);
      const resp = await axios.post('/session', JSON.stringify(values), {
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
      } else {
        setErrMsg('Login Failed');
      }
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: errMsg,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="w-6/12 absolute z-0">
        <img
          src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/45ab29df.png"
          alt="Tokopedia login background"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-10 bg-white rounded-md py-12 px-10 drop-shadow-md w-96 flex flex-col gap-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-3xl">Masuk</h1>
            <Link to={'/register'}>
              <h2 className="text-green-500">Daftar</h2>
            </Link>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
          <Button
            type="submit"
            className="bg-green-600 w-full hover:bg-green-700 font-bold"
          >
            {isLoading ? <Icon name="loading" /> : <span>Masuk</span>}
          </Button>
          <div className="grid grid-cols-4 items-center w-full gap-x-1">
            <Separator className="col-span-1" />
            <div className="col-span-2 text-center text-sm text-gray-400">
              atau masuk dengan
            </div>
            <Separator className="col-span-1" />
          </div>
          <Button className="flex items-center gap-x-3" variant={'outline'}>
            <Icon name="qr" />
            <span className="text-gray-400">Scan Kode QR</span>
          </Button>
          <Button className="flex items-center gap-x-3" variant={'outline'}>
            <Icon name="google" />
            <span>Google</span>
          </Button>
          <div className="flex items-center text-sm justify-center gap-x-1">
            <p>Butuh bantuan?</p>
            <span className="text-green-600">Hubungi Tokopedia Care</span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
