
import React from 'react';
import type { Location } from '../types';
import { SILENCE_LEVELS } from '../constants';

interface LocationCardProps {
  location: Location;
  onSelectLocation: (location: Location) => void;
  day: number;
  time: number;
}

const LocationTypeIcon: React.FC<{ type: Location['type'] }> = ({ type }) => {
    let iconClass = '';
    switch (type) {
        case 'Cafeteria': iconClass = 'fa-solid fa-mug-saucer'; break;
        case 'Biblioteca': iconClass = 'fa-solid fa-book-open'; break;
        case 'Parque': iconClass = 'fa-solid fa-tree'; break;
        case 'Livraria': iconClass = 'fa-solid fa-book'; break;
        case 'Coworking': iconClass = 'fa-solid fa-briefcase'; break;
    }
    return <i className={`${iconClass} text-blue-500`}></i>;
};


export const LocationCard: React.FC<LocationCardProps> = ({ location, onSelectLocation, day, time }) => {
  const currentSilenceScore = location.silenceProfile[day][time];
  const roundedScore = Math.round(currentSilenceScore);
  const silenceInfo = SILENCE_LEVELS[roundedScore as keyof typeof SILENCE_LEVELS];

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
      onClick={() => onSelectLocation(location)}
    >
        <div className="p-6 flex-grow">
            <div className="flex justify-between items-start">
                <div>
                     <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <LocationTypeIcon type={location.type} />
                        <span>{location.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{location.name}</h3>
                    <p className="text-gray-600 text-sm">{location.address}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                    <span className={`text-3xl font-bold ${silenceInfo.color}`}>
                        {currentSilenceScore.toFixed(1)}
                    </span>
                    <p className={`text-sm font-semibold ${silenceInfo.color}`}>{silenceInfo.label}</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700 font-semibold">Última avaliação:</p>
                {location.ratings.length > 0 ? (
                    <div className="text-sm text-gray-600 italic mt-1">
                        "{location.ratings[0].comment}"
                        <div className="text-xs text-gray-500 not-italic mt-1 text-right">- {location.ratings[0].author}</div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic mt-1">Nenhuma avaliação ainda.</p>
                )}
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-3">
             <span className="text-sm font-semibold text-blue-600 hover:text-blue-800">Ver detalhes e horários</span>
        </div>
    </div>
  );
};
