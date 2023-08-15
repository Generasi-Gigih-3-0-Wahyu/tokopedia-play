import { Comment, VideoDetailProps } from '@/@types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from '@/lib/axios';
import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useForm } from 'react-hook-form';
import {
  CreateCommentInput,
  createCommentSchema,
} from '@/schema/comment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ProductItem from '@/components/ProductItem';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { ScrollArea } from '@/components/ui/scroll-area';
import useAuth from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

const VideoDetail = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [video, setVideo] = useState<VideoDetailProps>();
  const [comments, setComments] = useState<Comment[]>([]);
  const { videoId } = useParams();
  const form = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { comment: '' },
  });
  const axiosPrivate = useAxiosPrivate();

  const getComments = async () => {
    try {
      const resp = await axios.get(`/videos/${videoId}/comments`);
      setComments(resp.data.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const onClick = () => {
    if (auth.accessToken === '') {
      toast({
        variant: 'destructive',
        title: 'You are not logged in',
        description: 'Please login',
        action: (
          <ToastAction altText="Log In" onClick={() => navigate('/login')}>
            Log In
          </ToastAction>
        ),
      });
    }
  };

  const onSubmit = async (values: CreateCommentInput) => {
    try {
      await axiosPrivate.post(`/comments/${videoId}`, JSON.stringify(values));
      getComments();
      form.reset();
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getVideos = async () => {
      try {
        const resp = await axios.get(`/videos/${videoId}`, {
          signal: controller.signal,
        });
        isMounted && setVideo(resp.data.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    getVideos();
    getComments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Toaster />
      <div className="h-screen relative">
        <div className="absolute h-screen z-10 w-full px-3">
          <header className="py-3 flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <div className="text-white flex items-center space-x-4">
                <Link to={'/'}>
                  <XIcon className="w-6 h-6" />
                </Link>
                <span className="font-semibold uppercase text-lg">
                  {video?.title}
                </span>
              </div>
              <div className="flex items-center space-x-4 mr-28">
                <Avatar>
                  <AvatarFallback>{video?.user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="uppercase font-bold text-white">
                  {video?.user.name}
                </span>
              </div>
            </div>
          </header>
          <main className="flex flex-col items-center h-[90vh] pt-4">
            <ReactPlayer
              controls
              muted={true}
              playing
              url={video?.url}
              width={'1300px'}
              height={'500px'}
            />
            <div className="w-full h-12 flex px-24 mt-4">
              <ScrollArea className="bg-white w-full px-2 rounded-md shadow-md">
                {comments.map((comment) => (
                  <div
                    className="flex items-center space-x-2"
                    key={comment._id}
                  >
                    <h3>{comment.user.name} : </h3>
                    <p>{comment.comment}</p>
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div className="flex items-center w-full px-24 mt-4">
              <Form {...form}>
                <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            onClick={onClick}
                            className="bg-transparent rounded-full text-white placeholder:text-slate-400 focus-visible:ring-green-600 focus-visible:ring-offset-0 focus-visible:border-none focus-visible:ring-1"
                            placeholder="Chat di sini...."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer">
                    <img
                      src="https://assets.tokopedia.net/assets-tokopedia-lite/v3/play/kratos/3c1ff4ed.svg"
                      alt="Product Cart"
                    />
                    <div className="absolute right-0 -bottom-1 bg-green-600 text-white px-1 rounded-md">
                      {video?.products.length}
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent side={'bottom'}>
                  <SheetHeader>
                    <SheetTitle className="text-xl">
                      Promo dan Produk Pilihan
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-3">
                    {video?.products.length! > 0 ? (
                      video?.products.map((product) => (
                        <ProductItem key={product._id} {...product} />
                      ))
                    ) : (
                      <div>Belum ada produk yang ditambahkan</div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </main>
        </div>
        <div className="absolute left-0">
          <img
            className="h-screen w-screen object-cover blur-sm brightness-75"
            src={video?.thumbnailUrl}
            alt="Thumbnail image"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
