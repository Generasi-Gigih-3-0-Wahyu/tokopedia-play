import { VideoShortProps } from '@/@types';
import VideoCard from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { ArrowLeft, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

function App() {
  const [videos, setVideos] = useState<VideoShortProps[]>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getVideos = async () => {
      try {
        const resp = await axios.get('/videos', {
          signal: controller.signal,
        });
        isMounted && setVideos(resp.data.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    getVideos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen px-3 relative">
      <header className="py-3 flex flex-col gap-y-6 sticky top-0">
        <div className="flex justify-between items-center">
          <div className="text-white flex items-center space-x-4">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">Play</span>
          </div>
          <div className="w-60">
            <Input
              className="bg-[#525867] text-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none pl-10 placeholder:text-slate-400"
              Icon={SearchIcon}
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            className="border-green-600 bg-green-400/20 text-green-300 rounded-xl hover:bg-green-400/40 hover:text-green-600"
            variant={'outline'}
          >
            Live
          </Button>
          <Button className="text-white rounded-xl" variant={'outline'}>
            Explore
          </Button>
          <Button className="text-white rounded-xl" variant={'outline'}>
            Promo ULTAH!
          </Button>
          <Button className="text-white rounded-xl" variant={'outline'}>
            Official Store
          </Button>
          <Button className="text-white rounded-xl" variant={'outline'}>
            Tips & Rekomendasi
          </Button>
          <Button className="text-white rounded-xl" variant={'outline'}>
            Terbaru
          </Button>
          <Button className="text-white rounded-xl" variant={'outline'}>
            Upcomming
          </Button>
        </div>
      </header>
      <main
        className={cn(
          videos.length > 0
            ? 'grid grid-cols-6 gap-4'
            : 'flex justify-center items-center h-[70vh]', 'mt-4'
        )}
      >
        {videos.length > 0 ? (
          videos.map((item) => <VideoCard key={item._id} {...item} />)
        ) : (
          <div className="text-white text-2xl font-semibold">
            Nothing To Watch
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
