import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// ==================== USER API METHODS ====================

// Get all users
export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

// Create a new user
export const createUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

// Update an existing user
export const updateUser = async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};

export default api;
