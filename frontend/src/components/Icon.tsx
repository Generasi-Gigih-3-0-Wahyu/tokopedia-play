import { FC, ReactElement } from 'react';

type IconName = 'qr' | 'google' | 'loading';

type IconObj = {
  [key in IconName]: ReactElement;
};

interface IconProps {
  name: IconName;
}

const QRIcon = () => {
  return (
    <svg className="unf-icon" viewBox="0 0 24 24" width="20" height="20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.8 2.24h-2.2a.75.75 0 000 1.5h2.2c.26 0 .45.15.45.36v2.2a.75.75 0 101.5 0V4.1a1.89 1.89 0 00-1.95-1.86zM21 16.85a.75.75 0 00-.75.75v2.2a.35.35 0 01-.35.34h-2.2a.75.75 0 100 1.5h2.2a1.84 1.84 0 001.85-1.84v-2.2a.75.75 0 00-.75-.75zM3.527 6.827A.76.76 0 013 7.05a.76.76 0 01-.75-.75V4.1A1.86 1.86 0 014.1 2.24h2.3a.75.75 0 010 1.5H4.1a.36.36 0 00-.35.36v2.2a.76.76 0 01-.223.527zM6.3 20.24H4.1c-.2 0-.35-.18-.35-.44v-2.2a.75.75 0 10-1.5 0v2.2a1.87 1.87 0 001.85 1.94h2.2a.75.75 0 100-1.5zm11.7-9.5h-4a.75.75 0 01-.75-.75v-4a.76.76 0 01.75-.75h4a.75.75 0 110 1.5h-3.25v2.5H18a.75.75 0 110 1.5zm-8-5.5H6a.76.76 0 00-.75.76v4a.75.75 0 101.5 0V6.74h2.5V10a.75.75 0 101.5 0V6a.76.76 0 00-.75-.76zm-4 8h4a.76.76 0 01.75.76v3.99a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75v-4a.76.76 0 01.75-.75zm.75 4h2.5v-2.5h-2.5v2.5zm11.78 1.29a.75.75 0 00.22-.53v-4a.75.75 0 10-1.5 0v3.25H14a.75.75 0 100 1.5h4a.75.75 0 00.53-.22zM13.5 14.5a1 1 0 011-1h.5a1 1 0 011 1v.5a1 1 0 01-1 1h-.5a1 1 0 01-1-1v-.5z"
      ></path>
    </svg>
  );
};

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
    >
      <defs>
        <path
          id="a"
          d="M17.386 7.364H9v3.477h4.827c-.45 2.21-2.332 3.477-4.827 3.477A5.308 5.308 0 0 1 3.682 9 5.308 5.308 0 0 1 9 3.682c1.268 0 2.414.45 3.314 1.186l2.618-2.618C13.336.86 11.3 0 9 0 4 0 0 4 0 9s4 9 9 9c4.5 0 8.6-3.273 8.6-9a7.38 7.38 0 0 0-.204-1.636z"
        />
      </defs>
      <g fillRule="evenodd" transform="translate(3 3)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill="#fbbc05"
          fillRule="nonzero"
          d="M-.818 14.318V3.682L6.136 9z"
          mask="url(#b)"
        />
        <mask id="c" fill="#fff">
          <use xlinkHref="#b" href="#a" />
        </mask>
        <path
          fill="#ea4335"
          fillRule="nonzero"
          d="M-.818 3.682L6.136 9 9 6.505l9.818-1.596V-.818H-.818z"
          mask="url(#c)"
        />
        <mask id="d" fill="#fff">
          <use xlinkHref="#c" href="#a" />
        </mask>
        <path
          fill="#34a853"
          fillRule="nonzero"
          d="M-.818 14.318L11.455 4.9l3.23.4 4.132-6.137V18.82H-.818z"
          mask="url(#d)"
        />
        <mask id="e" fill="#fff">
          <use xlinkHref="#d" href="#a" />
        </mask>
        <path
          fill="#4285f4"
          fillRule="nonzero"
          d="M18.818 18.818L6.136 9 4.5 7.773l14.318-4.09z"
          mask="url(#e)"
        />
      </g>
    </svg>
  );
};

const LoadingIcon = () => {
  return (
    <svg
      aria-hidden="true"
      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-400"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
};

const icons: IconObj = {
  qr: <QRIcon />,
  google: <GoogleIcon />,
  loading: <LoadingIcon />,
};

const Icon: FC<IconProps> = ({ name }) => {
  return <div>{icons[name]}</div>;
};

export default Icon;
