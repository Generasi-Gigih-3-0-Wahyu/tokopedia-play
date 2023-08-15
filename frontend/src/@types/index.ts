type UserAuth = {
  _id: string;
  name: string;
  email: string;
};

export type Auth = {
  user: UserAuth;
  accessToken: string;
};

export type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  user: string;
};

export type Comment = {
  _id: string;
  comment: string;
  user: {
    _id: string;
    name: string;
  };
};

export type VideoShortProps = {
  _id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  user: {
    _id: string;
    name: string;
  };
};

export type VideoDetailProps = {
  _id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  user: {
    _id: string;
    name: string;
  };
  products: Product[];
};
