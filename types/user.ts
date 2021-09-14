export interface User {
  id: string;
  name: string;
  screenName: string;
  profileImageUrl: string;
  profileBannerUrl: string;
  statusesCount: number;
  followingCount: boolean;
  followersCount: number;
  listedCount: number;
  favoritesCount: number;
  bio: string;
  location: string;
  url: string;
  isProtected: boolean;
  isVerified: boolean;
  createdAt: string;
}
