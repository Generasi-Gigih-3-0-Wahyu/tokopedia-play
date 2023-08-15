import { VideoShortProps } from '@/@types';
import { EyeIcon } from 'lucide-react';
import { FC } from 'react';
import Icon from './Icon';
import { Link } from 'react-router-dom';

const VideoCard: FC<VideoShortProps> = ({ _id, thumbnailUrl, title, user }) => {
  return (
    <Link to={`/${_id}`}>
      <div className="col-span-1 relative h-96 rounded-lg">
        <div className="flex flex-col justify-between z-10 absolute h-full w-full">
          <div className="flex items-center space-x-2 p-2">
            <div className="bg-red-500 uppercase text-white rounded-sm font-semibold text-xs px-1 py-0.5">
              Live
            </div>
            <div className="bg-gray-800/50 text-white flex items-center rounded-sm px-1 py-0.5 space-x-1">
              <EyeIcon className="w-4 h-4" />
              <span className="text-xs">110</span>
            </div>
          </div>
          <div className="text-white bg-gradient-to-b from-transparent to-black/80 p-2 rounded-b-lg">
            <div className="w-fit bg-red-500 text-xs font-semibold px-1 py-0.5 rounded-sm mb-1">
              Hanya saat LIVE
            </div>
            <div className="flex items-center bg-green-600 w-fit text-sm font-semibold px-1 py-0.5 rounded-sm">
              <Icon name="discount" />
              <span>Kejar Diskon</span>
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-slate-300 font-semibold text-sm">{user.name}</p>
          </div>
        </div>
        <div className="absolute z-0">
          <img
            className="object-cover h-96 rounded-lg z-0"
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
          />
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
