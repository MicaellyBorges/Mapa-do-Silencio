import React, { useState, useEffect } from 'react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (email: string, password_unused: string) => boolean;
    onRegister: (name: string, email: string, password_unused: string) => boolean;
    initialMode: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onRegister, initialMode }) => {
    const [mode, setMode] = useState(initialMode);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setMode(initialMode);
        setError('');
    }, [initialMode, isOpen]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        let success = false;
        if (mode === 'login') {
            success = onLogin(email, password);
            if (!success) setError('E-mail ou senha inválidos.');
        } else {
            success = onRegister(name, email, password);
            if (!success) setError('Este e-mail já está em uso.');
        }

        if (success) {
            onClose();
            setName('');
            setEmail('');
            setPassword('');
        }
    };
    
    if (!isOpen) return null;

    const isLogin = mode === 'login';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Entrar na sua conta' : 'Criar uma conta'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Senha</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                    </div>
                     <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                        {isLogin ? 'Entrar' : 'Cadastrar-se'}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <p className="text-gray-600">
                        {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
                        <button onClick={() => setMode(isLogin ? 'register' : 'login')} className="font-medium text-blue-600 hover:underline">
                            {isLogin ? "Cadastre-se" : "Entrar"}
                        </button>
                    </p>
                </div>
                 <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">OU</span>
                    </div>
                </div>
                <div className="space-y-3">
                     <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <i className="fab fa-google text-red-500"></i>
                        <span>Continuar com Google</span>
                    </button>
                     <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <i className="fab fa-facebook text-blue-800"></i>
                        <span>Continuar com Facebook</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
