import React, { useState, useEffect } from 'react';
import type { User } from '../types';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onUpdateProfile: (userId: string, data: Partial<Pick<User, 'name' | 'photoUrl'>>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, onUpdateProfile }) => {
    const [name, setName] = useState(user.name);

    useEffect(() => {
        if (isOpen) {
            setName(user.name);
        }
    }, [isOpen, user.name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim() === '') {
            alert("O nome не pode ficar em branco.");
            return;
        }
        onUpdateProfile(user.id, { name });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Meu Perfil</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                            <i className="fa-solid fa-user text-4xl text-gray-400"></i>
                        </div>
                        <div>
                             <p className="text-sm font-medium text-gray-500">Foto do Perfil</p>
                             <button type="button" className="text-sm text-blue-600 hover:underline">Alterar foto</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            id="profile-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700">Email</label>
                         <p id="profile-email" className="text-gray-800 bg-gray-100 p-2 rounded-md mt-1">{user.email}</p>
                    </div>
                   
                    <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
