import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import PeopleIcon from '@mui/icons-material/People';

import UserCard from '../UserCard/UserCard';
import './UserList.css';

/**
 * User List component to display all users
 */
const UserList = ({ users, loading, error, onEdit, onDelete }) => {
    // Loading state
    if (loading && users.length === 0) {
        return (
            <Box className="user-list-status">
                <CircularProgress />
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Loading users...
                </Typography>
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Alert severity="error" className="user-list-alert">
                {error}
            </Alert>
        );
    }

    // Empty state
    if (users.length === 0) {
        return (
            <Box className="user-list-empty">
                <PeopleIcon sx={{ fontSize: 64, color: '#bdbdbd', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                    No contacts yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Add your first contact using the form above.
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="user-list-container">
            <Box className="user-list-header">
                <Typography variant="h5" component="h2" className="section-title">
                    <PeopleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Contacts ({users.length})
                </Typography>
            </Box>

            <Row className="g-3">
                {users.map(user => (
                    <Col key={user._id} xs={12} sm={6} lg={4}>
                        <UserCard
                            user={user}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </Col>
                ))}
            </Row>
        </Box>
    );
};

export default UserList;
