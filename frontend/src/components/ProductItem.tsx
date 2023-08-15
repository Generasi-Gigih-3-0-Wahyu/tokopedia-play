import { Product } from '@/@types';
import { FC } from 'react';
import Icon from './Icon';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

const ProductItem: FC<Product> = ({ imageUrl, name, price }) => {
  return (
    <div className="flex items-start bg-white shadow-lg rounded-md p-2">
      <div className="w-32">
        <img className="rounded-md" src={imageUrl} alt={name} />
      </div>
      <div>
        <h2>{name}</h2>
        <h3 className="font-semibold text-lg">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          }).format(price)}
        </h3>
        <div className="flex items-center space-x-1">
          <Icon name="star" className="w-4 h-4 flex" />
          <p>5.0</p>
          <Separator orientation="vertical" className="h-4 w-0.5 " />
          <p>Terjual 17</p>
        </div>
        <div className='space-x-4 mt-2'>
          <Button className='w-32 border-green-600 text-green-600 hover:bg-green-600 hover:text-white' variant={'outline'}>Beli</Button>
          <Button className="bg-green-600 w-32 hover:bg-green-700">+ Keranjang</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
