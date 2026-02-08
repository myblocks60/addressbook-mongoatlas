import React, { useState } from 'react';
import { Container, Box, Typography, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';

import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';
import Modal from './components/common/Modal';
import Button from './components/common/Button';
import useUsers from './hooks/useUsers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Create custom MUI theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
        },
        background: {
            default: '#f5f7fa',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

function App() {
    const { users, loading, error, addUser, editUser, removeUser } = useUsers();
    const [editingUser, setEditingUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    // Handle add user
    const handleAddUser = async (userData) => {
        return await addUser(userData);
    };

    // Handle edit click
    const handleEditClick = (user) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    // Handle edit submit
    const handleEditSubmit = async (userData) => {
        const result = await editUser(editingUser._id || editingUser.id, userData);
        if (result.success) {
            setIsEditModalOpen(false);
            setEditingUser(null);
        }
        return result;
    };

    // Handle delete click
    const handleDeleteClick = (userId) => {
        setDeleteConfirmId(userId);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        if (deleteConfirmId) {
            await removeUser(deleteConfirmId);
            setDeleteConfirmId(null);
        }
    };

    // Cancel delete
    const handleCancelDelete = () => {
        setDeleteConfirmId(null);
    };

    // Close edit modal
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingUser(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box className="app-wrapper">
                <Container maxWidth="lg" className="app-container">
                    {/* Header */}
                    <Box className="app-header">
                        <Typography variant="h4" component="h1" className="app-title">
                            <ContactsIcon sx={{ fontSize: 40, mr: 1, verticalAlign: 'middle' }} />
                            Address Book
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className="app-subtitle">
                            Manage your contacts easily
                        </Typography>
                    </Box>

                    {/* Add User Form */}
                    <Box className="form-section">
                        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                            Add New Contact
                        </Typography>
                        <UserForm
                            onSubmit={handleAddUser}
                            loading={loading}
                            submitLabel="Add Contact"
                        />
                    </Box>

                    {/* User List */}
                    <UserList
                        users={users}
                        loading={loading}
                        error={error}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />

                    {/* Edit Modal */}
                    <Modal
                        open={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        title="Edit Contact"
                    >
                        <UserForm
                            onSubmit={handleEditSubmit}
                            initialData={editingUser}
                            loading={loading}
                            submitLabel="Update Contact"
                        />
                    </Modal>

                    {/* Delete Confirmation Modal */}
                    <Modal
                        open={!!deleteConfirmId}
                        onClose={handleCancelDelete}
                        title="Confirm Delete"
                        actions={
                            <>
                                <Button variant="outlined" onClick={handleCancelDelete}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleConfirmDelete}
                                >
                                    Delete
                                </Button>
                            </>
                        }
                    >
                        <Typography>
                            Are you sure you want to delete this contact? This action cannot be undone.
                        </Typography>
                    </Modal>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
