import { useState, useCallback } from 'react';
import type { Location, Rating, DailySilenceProfile } from '../types';

const generateRandomProfile = (): DailySilenceProfile => {
  return Array.from({ length: 7 }, () =>
    Array.from({ length: 24 }, (_, hour) => {
      // Quieter in early morning and late night, busier around lunch and evening
      const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
      let baseSilence = 3.5;
      if (hour < 7 || hour > 22) baseSilence = 4.5; // very quiet
      else if (hour > 11 && hour < 14) baseSilence = 2.5; // lunch rush
      else if (hour > 17 && hour < 20) baseSilence = isWeekend ? 2.0 : 3.0; // evening
      
      return Math.max(1, Math.min(5, baseSilence + (Math.random() - 0.5)));
    })
  );
};

const INITIAL_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Café do Saber',
    address: 'Rua da Sabedoria, 123',
    type: 'Cafeteria',
    position: { lat: -23.5505, lng: -46.6333 },
    silenceProfile: generateRandomProfile(),
    ratings: [
      { id: 'r1', author: 'Ana Clara', rating: 4, comment: 'Ótimo para focar de manhã. Fica mais cheio depois do almoço.', tags: ['Wi-Fi bom', 'Tomadas disponíveis'], timestamp: new Date(Date.now() - 86400000 * 2) },
      { id: 'r2', author: 'Bruno Lima', rating: 3, comment: 'A música ambiente às vezes é um pouco alta.', tags: ['Música ambiente'], timestamp: new Date(Date.now() - 86400000) },
    ],
  },
  {
    id: '2',
    name: 'Biblioteca Central Mário de Andrade',
    address: 'Rua da Consolação, 94',
    type: 'Biblioteca',
    position: { lat: -23.546, lng: -46.643 },
    silenceProfile: generateRandomProfile(),
    ratings: [
      { id: 'r3', author: 'Carlos Souza', rating: 5, comment: 'Silêncio absoluto. O paraíso para estudar.', tags: ['Isolado'], timestamp: new Date(Date.now() - 86400000 * 5) },
    ],
  },
  {
    id: '3',
    name: 'Parque Ibirapuera (área de leitura)',
    address: 'Av. Pedro Álvares Cabral, s/n',
    type: 'Parque',
    position: { lat: -23.588, lng: -46.658 },
    silenceProfile: generateRandomProfile(),
    ratings: [
      { id: 'r4', author: 'Daniela Reis', rating: 4, comment: 'Encontrei um canto tranquilo perto do lago. Bom para ler nos dias de semana.', tags: ['Isolado'], timestamp: new Date(Date.now() - 86400000 * 3) },
    ],
  },
   {
    id: '4',
    name: 'Livraria Cultura',
    address: 'Av. Paulista, 2073',
    type: 'Livraria',
    position: { lat: -23.557, lng: -46.661 },
    silenceProfile: generateRandomProfile(),
    ratings: [
      { id: 'r5', author: 'Fernanda Costa', rating: 3, comment: 'Pode ser um pouco movimentado, mas os puffs no andar de cima são ótimos para uma leitura rápida.', tags: ['Música ambiente'], timestamp: new Date(Date.now() - 86400000 * 10) },
       { id: 'r6', author: 'Gabriel Martins', rating: 4, comment: 'Durante a semana pela manhã é super tranquilo.', tags: [], timestamp: new Date(Date.now() - 86400000 * 4) },
    ],
  },
];

export const useMockData = () => {
  const [locations, setLocations] = useState<Location[]>(INITIAL_LOCATIONS);

  const addRating = useCallback((locationId: string, ratingData: Omit<Rating, 'id' | 'timestamp'>) => {
    const newRating: Rating = {
      ...ratingData,
      id: `r${Date.now()}`,
      timestamp: new Date(),
    };

    setLocations(prevLocations =>
      prevLocations.map(location => {
        if (location.id === locationId) {
          // Add new rating
          const updatedRatings = [newRating, ...location.ratings];
          
          // Recalculate silence profile based on new rating
          const today = newRating.timestamp.getDay();
          const hour = newRating.timestamp.getHours();
          const oldAvg = location.silenceProfile[today][hour];
          const totalRatingsForHour = location.ratings.filter(r => r.timestamp.getDay() === today && r.timestamp.getHours() === hour).length;
          
          const newAvg = ((oldAvg * totalRatingsForHour) + newRating.rating) / (totalRatingsForHour + 1);

          const updatedSilenceProfile = location.silenceProfile.map((dayProfile, dayIndex) => {
              if(dayIndex === today) {
                  return dayProfile.map((hourProfile, hourIndex) => {
                      return hourIndex === hour ? newAvg : hourProfile;
                  });
              }
              return dayProfile;
          });

          return { ...location, ratings: updatedRatings, silenceProfile: updatedSilenceProfile };
        }
        return location;
      })
    );
  }, []);

  const addLocation = useCallback((locationData: Omit<Location, 'id' | 'ratings' | 'silenceProfile' | 'position'>) => {
      const newLocation: Location = {
          ...locationData,
          id: `l${Date.now()}`,
          ratings: [],
          silenceProfile: generateRandomProfile(),
          position: { lat: 0, lng: 0 }, // Mock position
      };
      setLocations(prev => [newLocation, ...prev]);
  }, []);

  return { locations, addRating, addLocation };
};
