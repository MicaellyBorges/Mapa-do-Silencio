import { useState, useCallback } from 'react';
import type { User } from '../types';

const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Ana Clara', email: 'ana@example.com' },
    { id: 'u2', name: 'Bruno Lima', email: 'bruno@example.com' },
];

export const useAuth = () => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const login = useCallback((email: string, password_unused: string): boolean => {
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    }, [users]);

    const register = useCallback((name: string, email: string, password_unused: string): boolean => {
        const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
            return false;
        }
        const newUser: User = {
            id: `u${Date.now()}`,
            name,
            email,
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        return true;
    }, [users]);

    const logout = useCallback(() => {
        setCurrentUser(null);
    }, []);

    const updateProfile = useCallback((userId: string, data: Partial<Pick<User, 'name' | 'photoUrl'>>) => {
        let updatedUser: User | null = null;
        setUsers(prevUsers => prevUsers.map(user => {
            if (user.id === userId) {
                updatedUser = { ...user, ...data };
                return updatedUser;
            }
            return user;
        }));
        if(updatedUser) {
             setCurrentUser(updatedUser);
        }
    }, []);

    return { currentUser, login, register, logout, updateProfile };
};
