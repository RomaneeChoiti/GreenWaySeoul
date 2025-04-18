
interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  markerType: 'trash' | 'recycle';
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

interface TrashcanData {
  Address: string;
  Latitude: number;
  Longitude: number;
  canType: string;
  설치위치: string;
}

interface Post {

}

export type { ImageUri, Marker, Profile, Post, TrashcanData };
