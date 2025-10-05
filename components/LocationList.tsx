
import React from 'react';
import { LocationCard } from './LocationCard';
import { Filters } from './Filters';
import { AddLocationModal } from './AddLocationModal';
import type { Location } from '../types';

interface LocationListProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  silenceFilter: number;
  setSilenceFilter: (value: number) => void;
  dayFilter: number;
  setDayFilter: (day: number) => void;
  timeFilter: number;
  setTimeFilter: (time: number) => void;
  showAddLocationModal: boolean;
  setShowAddLocationModal: (show: boolean) => void;
  onAddNewLocation: (newLocation: Omit<Location, 'id' | 'ratings' | 'silenceProfile' | 'position'>) => void;
}

export const LocationList: React.FC<LocationListProps> = (props) => {
  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Encontre seu oásis de tranquilidade</h2>
            <p className="mt-2 text-lg text-gray-600">Busque, filtre e descubra os melhores lugares para se concentrar.</p>
        </div>

        <Filters {...props} />

        {props.locations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {props.locations.map((location) => (
                <LocationCard
                key={location.id}
                location={location}
                onSelectLocation={props.onSelectLocation}
                day={props.dayFilter}
                time={props.timeFilter}
                />
            ))}
            </div>
        ) : (
            <div className="text-center py-16 px-4 bg-white rounded-lg shadow">
                <i className="fa-solid fa-map-location-dot text-5xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700">Nenhum local encontrado</h3>
                <p className="text-gray-500 mt-1">Tente ajustar seus filtros ou ampliar sua busca.</p>
            </div>
        )}
      </div>
      <AddLocationModal 
        isOpen={props.showAddLocationModal}
        onClose={() => props.setShowAddLocationModal(false)}
        onAddLocation={props.onAddNewLocation}
      />
    </>
  );
};
