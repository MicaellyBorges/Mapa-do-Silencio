
import React from 'react';
import { DAYS_OF_WEEK, SILENCE_LEVELS } from '../constants';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  silenceFilter: number;
  setSilenceFilter: (value: number) => void;
  dayFilter: number;
  setDayFilter: (day: number) => void;
  timeFilter: number;
  setTimeFilter: (time: number) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  silenceFilter,
  setSilenceFilter,
  dayFilter,
  setDayFilter,
  timeFilter,
  setTimeFilter,
}) => {
  const currentSilenceInfo = SILENCE_LEVELS[Math.round(silenceFilter) as keyof typeof SILENCE_LEVELS] || {label: "Qualquer nível", color: "text-gray-500"};

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg space-y-4 sticky top-[81px] z-10">
      <div className="relative">
        <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Buscar por nome ou tipo (ex: cafeteria, parque...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Day Filter */}
        <div>
          <label htmlFor="day-filter" className="block text-sm font-medium text-gray-700 mb-1">Dia da Semana</label>
          <select
            id="day-filter"
            value={dayFilter}
            onChange={(e) => setDayFilter(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {DAYS_OF_WEEK.map((day, index) => (
              <option key={index} value={index}>
                {day}
              </option>
            ))}
          </select>
        </div>
        
        {/* Time Filter */}
        <div className="col-span-1 md:col-span-2">
           <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Horário: <span className="font-bold">{String(timeFilter).padStart(2, '0')}:00</span>
          </label>
          <input
            id="time-filter"
            type="range"
            min="0"
            max="23"
            value={timeFilter}
            onChange={(e) => setTimeFilter(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
       <div className="col-span-1 md:col-span-3">
          <label htmlFor="silence-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Nível de Silêncio Mínimo: <span className={`font-bold ${currentSilenceInfo.color}`}>{currentSilenceInfo.label}</span>
          </label>
          <input
            id="silence-filter"
            type="range"
            min="0"
            max="5"
            step="1"
            value={silenceFilter}
            onChange={(e) => setSilenceFilter(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
    </div>
  );
};
