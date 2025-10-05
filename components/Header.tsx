import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../types';

interface HeaderProps {
    user: User | null;
    onAddLocationClick: () => void;
    onLoginClick: () => void;
    onRegisterClick: () => void;
    onProfileClick: () => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onAddLocationClick, onLoginClick, onRegisterClick, onProfileClick, onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <i className="fa-solid fa-moon text-2xl text-blue-600"></i>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Mapa do Silêncio
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onAddLocationClick}
                        className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        <i className="fa-solid fa-plus"></i>
                        <span>Sugerir Local</span>
                    </button>
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 ring-2 ring-offset-2 ring-transparent focus:ring-blue-500">
                                <i className="fa-solid fa-user text-gray-600"></i>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onProfileClick(); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meu Perfil</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <button onClick={onLoginClick} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">Entrar</button>
                            <button onClick={onRegisterClick} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md">Cadastrar-se</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
