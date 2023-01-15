export interface User {
  user: {
    cover: string;
    profilePic: string;
    username: string;
    description: string;
    location: string;
    hometown: string;
    email: string;
    following: string[];
    followers: string[];
    relationship: number;
    _id: string;
  } | null;
}

export interface PostType {
  date: number;
  description: string;
  img: string;
  likes: string[];
  userId: string;
  _id: string;
  comments: string[];
}

export type Username = {
  username: string | undefined;
};

export interface Follow {
  username: string;
  profilePic: string;
}

export type UserProps = {
  user: {
    profile: string;
    name: string;
    id: number;
  };
};

export type PostProps = {
  desc: string;
  comments?: string[];
  date: number;
  description?: string;
  img: string;
  likes: string[];
  userId: string;
  postId: string;
};

export type PostUser = {
  _id: string;
  isAdmin: boolean;
  username: string;
  email: string;
  profilePic: string;
  cover: string;
  followers?: string[];
  following?: string[];
  password?: string;
};

export type AuthState = {
  user: PostUser | null;
  isFetching: boolean;
  error: boolean;
  dispatch?: React.Dispatch<object>;
};
