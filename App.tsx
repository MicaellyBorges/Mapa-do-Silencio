import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { LocationDetails } from './components/LocationDetails';
import { LocationList } from './components/LocationList';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { useMockData } from './hooks/useMockData';
import { useAuth } from './hooks/useAuth';
import type { Location, Rating, User } from './types';

const App: React.FC = () => {
  const { locations, addRating, addLocation } = useMockData();
  const { currentUser, login, register, logout, updateProfile } = useAuth();
  
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [silenceFilter, setSilenceFilter] = useState(0);
  const [dayFilter, setDayFilter] = useState(new Date().getDay());
  const [timeFilter, setTimeFilter] = useState(new Date().getHours());

  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showProfileModal, setShowProfileModal] = useState(false);


  const handleSelectLocation = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const handleAddRating = useCallback((locationId: string, rating: Omit<Rating, 'id' | 'timestamp'>) => {
    if (!currentUser) return; // Should not happen if form is properly gated
    addRating(locationId, { ...rating, author: currentUser.name });
    if(selectedLocation) {
        const updatedLocation = locations.find(l => l.id === locationId);
        if (updatedLocation) {
            setSelectedLocation(updatedLocation);
        }
    }
  }, [addRating, selectedLocation, locations, currentUser]);

  const handleAddNewLocation = (newLocation: Omit<Location, 'id' | 'ratings' | 'silenceProfile' | 'position'>) => {
    addLocation(newLocation);
    setShowAddLocationModal(false);
  };

  const handleOpenAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleUpdateProfile = (userId: string, data: Partial<Pick<User, 'name' | 'photoUrl'>>) => {
    updateProfile(userId, data);
    setShowProfileModal(false);
  };


  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const nameMatch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = location.type.toLowerCase().includes(searchQuery.toLowerCase());
      const currentSilence = location.silenceProfile[dayFilter][timeFilter];
      const silenceMatch = currentSilence >= silenceFilter;
      return (nameMatch || typeMatch) && silenceMatch;
    });
  }, [locations, searchQuery, silenceFilter, dayFilter, timeFilter]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header 
        user={currentUser}
        onAddLocationClick={() => setShowAddLocationModal(true)}
        onLoginClick={() => handleOpenAuthModal('login')}
        onRegisterClick={() => handleOpenAuthModal('register')}
        onProfileClick={() => setShowProfileModal(true)}
        onLogout={logout}
      />
      <main className="container mx-auto p-4 md:p-6">
        {selectedLocation ? (
          <LocationDetails
            location={selectedLocation}
            onBack={handleBackToList}
            onAddRating={handleAddRating}
            day={dayFilter}
            time={timeFilter}
            currentUser={currentUser}
          />
        ) : (
          <LocationList
            locations={filteredLocations}
            onSelectLocation={handleSelectLocation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            silenceFilter={silenceFilter}
            setSilenceFilter={setSilenceFilter}
            dayFilter={dayFilter}
            setDayFilter={setDayFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            showAddLocationModal={showAddLocationModal}
            setShowAddLocationModal={setShowAddLocationModal}
            onAddNewLocation={handleAddNewLocation}
          />
        )}
      </main>
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
        onRegister={register}
        initialMode={authMode}
      />
      {currentUser && (
        <ProfileModal 
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            user={currentUser}
            onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default App;
