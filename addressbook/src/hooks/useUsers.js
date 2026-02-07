import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';

/**
 * Custom hook for managing users state and CRUD operations
 */
const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all users
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Add a new user
    const addUser = useCallback(async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await createUser(userData);
            setUsers(prev => [newUser, ...prev]);
            return { success: true, data: newUser };
        } catch (err) {
            const errorMsg = err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.message ||
                'Failed to add user';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    }, []);

    // Update existing user
    const editUser = useCallback(async (id, userData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await updateUser(id, userData);
            setUsers(prev => prev.map(user =>
                user._id === id ? updatedUser : user
            ));
            return { success: true, data: updatedUser };
        } catch (err) {
            const errorMsg = err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.message ||
                'Failed to update user';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    }, []);

    // Remove user
    const removeUser = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteUser(id);
            setUsers(prev => prev.filter(user => user._id !== id));
            return { success: true };
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to delete user';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Fetch users on mount
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        editUser,
        removeUser,
        clearError
    };
};

export default useUsers;
