export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
  plays: number;
  likes: number;
}

export interface PlaylistType {
  id: string;
  name: string;
  songs: Song[];
}