import React from 'react';
import { Card, CardContent, Box, Typography, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import { getDisplayFields } from '../UserForm/formConfig';
import './UserCard.css';

/**
 * User Card component to display individual user info
 */
const UserCard = ({ user, onEdit, onDelete }) => {
    const displayFields = getDisplayFields();

    // Icon mapping for common field types
    const getFieldIcon = (fieldName) => {
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                return <PersonIcon fontSize="small" />;
            case 'phone':
                return <PhoneIcon fontSize="small" />;
            case 'email':
                return <EmailIcon fontSize="small" />;
            default:
                return null;
        }
    };

    return (
        <Card className="user-card" elevation={2}>
            <CardContent>
                <Box className="user-card-header">
                    <Typography variant="h6" component="h3" className="user-name">
                        {user.firstName} {user.lastName}
                    </Typography>

                    <Box className="user-card-actions">
                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={() => onEdit(user)}
                                aria-label="Edit user"
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => onDelete(user._id)}
                                aria-label="Delete user"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Box className="user-card-details">
                    <Box className="user-field">
                        <PhoneIcon fontSize="small" className="field-icon" />
                        <Typography variant="body2" color="text.secondary">
                            {user.phone}
                        </Typography>
                    </Box>

                    <Box className="user-field">
                        <EmailIcon fontSize="small" className="field-icon" />
                        <Typography variant="body2" color="text.secondary">
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard;
