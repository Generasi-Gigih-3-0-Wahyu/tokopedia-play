import { Link, Outlet } from 'react-router-dom';
import { Toaster } from '../ui/toaster';
import { Separator } from '../ui/separator';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <Toaster />
      <header className="w-full flex justify-center pt-8 pb-10">
        <div className="w-48">
          <Link to={'/'}>
            <img
              src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/581fca3a.png"
              alt="Tokopedia logo"
            />
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="py-4">
        <div className="flex items-center justify-center space-x-2 py-4">
          <p className="text-gray-400 font-semibold">
            © 2009-{new Date().getFullYear()}, PT Tokopedia
          </p>
          <Separator className="h-5" orientation="vertical" />
          <span className="text-green-600 font-bold">Tokopedia Care</span>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
