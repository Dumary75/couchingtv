

export interface Video {
  id: string;
  title: string;
  url?: string;
  thumbN?: string;
  addedAt?: string;
};

export interface Profile { 
    id: string; 
    name?: string; 
    avatarUrl?: string 
    myList?: Video[];
};