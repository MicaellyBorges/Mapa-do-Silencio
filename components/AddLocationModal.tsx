
import React, { useState } from 'react';
import type { Location } from '../types';

interface AddLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddLocation: (locationData: Omit<Location, 'id' | 'ratings' | 'silenceProfile' | 'position'>) => void;
}

export const AddLocationModal: React.FC<AddLocationModalProps> = ({ isOpen, onClose, onAddLocation }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState<'Cafeteria' | 'Biblioteca' | 'Parque' | 'Livraria' | 'Coworking'>('Cafeteria');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !address) {
            alert("Por favor, preencha o nome e o endereço.");
            return;
        }
        onAddLocation({ name, address, type });
        setName('');
        setAddress('');
        setType('Cafeteria');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Sugerir Novo Local</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="location-name" className="block text-sm font-medium text-gray-700">Nome do Local</label>
                        <input
                            type="text"
                            id="location-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="location-address" className="block text-sm font-medium text-gray-700">Endereço</label>
                        <input
                            type="text"
                            id="location-address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="location-type" className="block text-sm font-medium text-gray-700">Tipo de Local</label>
                        <select
                            id="location-type"
                            value={type}
                            onChange={(e) => setType(e.target.value as any)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option>Cafeteria</option>
                            <option>Biblioteca</option>
                            <option>Parque</option>
                            <option>Livraria</option>
                            <option>Coworking</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                            Adicionar Local
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
