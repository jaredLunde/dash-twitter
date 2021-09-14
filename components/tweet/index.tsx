import { styles } from "@/styles";
import type { User } from "@/types/user";

export function Tweet(props: TweetProps) {
  return <div className={tweet()}></div>;
}

const tweet = styles.one((t) => ({}));

export interface TweetProps {
  tweet: Tweet;
}

export interface Tweet {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  attachment?: TweetAttachment;
}

export type TweetAttachment =
  | TweetPhotosAttachment
  | TweetVideoAttachment
  | TweetLinkAttachment;

export type TweetPhotosAttachment = {
  id: string;
  type: "photos";
  photos: TweetPhoto[];
  createdAt: string;
};

export type TweetPhoto = {
  id: string;
  url: string;
  width: number;
  height: number;
  createdAt: string;
};

export type TweetVideoAttachment = {
  id: string;
  type: "video";
  video: TweetVideo;
  createdAt: string;
};

export type TweetVideo = {
  id: string;
  url: string;
  width: number;
  height: number;
  duration: number;
  thumbnail: TweetPhoto;
  createdAt: string;
};

export type TweetLinkAttachment = {
  id: string;
  type: "link";
  link: TweetLink;
  createdAt: string;
};

export type TweetLink = {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail: TweetPhoto;
  createdAt: string;
};
