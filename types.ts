export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
}

export interface Rating {
  id: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  tags: string[];
  timestamp: Date;
}

export type HourlySilenceProfile = number[]; // Array of 24 numbers (0-23 hours)

export type DailySilenceProfile = HourlySilenceProfile[]; // Array of 7 days (0=Sun, 6=Sat)

export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'Cafeteria' | 'Biblioteca' | 'Parque' | 'Livraria' | 'Coworking';
  position: {
    lat: number;
    lng: number;
  };
  silenceProfile: DailySilenceProfile;
  ratings: Rating[];
}
