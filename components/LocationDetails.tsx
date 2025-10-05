import React, { useState } from 'react';
import type { Location, Rating, User } from '../types';
import { DAYS_OF_WEEK, SILENCE_LEVELS } from '../constants';
import { SilenceChart } from './SilenceChart';
import { RatingForm } from './RatingForm';

interface LocationDetailsProps {
  location: Location;
  onBack: () => void;
  onAddRating: (locationId: string, rating: Omit<Rating, 'id' | 'author' | 'timestamp'>) => void;
  day: number;
  time: number;
  currentUser: User | null;
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex text-yellow-400">
            {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fas fa-star"></i>)}
            {halfStar && <i className="fas fa-star-half-alt"></i>}
            {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="far fa-star"></i>)}
        </div>
    );
};

export const LocationDetails: React.FC<LocationDetailsProps> = ({ location, onBack, onAddRating, day: initialDay, time, currentUser }) => {
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const currentSilenceScore = location.silenceProfile[selectedDay][time];
  const roundedScore = Math.round(currentSilenceScore);
  const silenceInfo = SILENCE_LEVELS[roundedScore as keyof typeof SILENCE_LEVELS];

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800 mb-4">
        <i className="fa-solid fa-arrow-left"></i>
        <span>Voltar para a lista</span>
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{location.name}</h2>
          <p className="text-gray-500 mt-1">{location.address}</p>
        </div>
        <div className="mt-4 md:mt-0 text-left md:text-right bg-gray-100 p-4 rounded-lg">
           <p className="text-sm font-medium text-gray-600">Silêncio agora ({String(time).padStart(2,'0')}:00)</p>
           <div className={`text-3xl font-bold ${silenceInfo.color}`}>{currentSilenceScore.toFixed(1)}</div>
           <p className={`font-semibold ${silenceInfo.color}`}>{silenceInfo.label}</p>
        </div>
      </div>
      
      {/* Temporal Silence Profile */}
      <div className="my-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Perfil de Silêncio Temporal</h3>
        <div className="flex space-x-2 overflow-x-auto pb-2">
            {DAYS_OF_WEEK.map((dayName, index) => (
                <button 
                    key={index} 
                    onClick={() => setSelectedDay(index)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${selectedDay === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {dayName}
                </button>
            ))}
        </div>
        <div className="mt-4 h-64 w-full">
            <SilenceChart data={location.silenceProfile[selectedDay]} />
        </div>
      </div>

       {/* Add Rating */}
       <div className="my-6 p-6 bg-blue-50 rounded-lg">
         <h3 className="text-xl font-bold text-gray-800 mb-3">Deixe sua avaliação</h3>
         {currentUser ? (
            <RatingForm locationId={location.id} onSubmit={onAddRating} />
         ) : (
            <div className="text-center text-gray-600">
                <p>Você precisa estar logado para avaliar um local.</p>
                <p className="text-sm mt-1">(Botões de login estão no cabeçalho)</p>
            </div>
         )}
       </div>

      {/* User Reviews */}
      <div className="my-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Avaliações da Comunidade ({location.ratings.length})</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {location.ratings.length > 0 ? location.ratings.map(rating => (
            <div key={rating.id} className="p-4 border border-gray-200 rounded-lg">
               <div className="flex justify-between items-center">
                   <div>
                       <p className="font-bold">{rating.author}</p>
                       <p className="text-xs text-gray-500">{rating.timestamp.toLocaleDateString()}</p>
                   </div>
                   <RatingStars rating={rating.rating} />
               </div>
               <p className="text-gray-700 my-2">{rating.comment}</p>
               <div className="flex flex-wrap gap-2">
                   {rating.tags.map(tag => (
                       <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">{tag}</span>
                   ))}
               </div>
            </div>
          )) : (
            <p className="text-gray-500 italic">Seja o primeiro a avaliar este local!</p>
          )}
        </div>
      </div>
    </div>
  );
};
