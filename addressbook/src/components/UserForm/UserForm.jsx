import React, { useState, useEffect } from 'react';
import { Box, Alert, Snackbar } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

import Input from '../common/Input';
import Button from '../common/Button';
import { USER_FIELDS, getInitialFormData } from './formConfig';
import { validateForm, validateField, isFormValid } from '../../utils/validators';
import './UserForm.css';

/**
 * Dynamic User Form component
 * Renders fields based on formConfig.js for extensibility
 */
const UserForm = ({
    onSubmit,
    initialData = null,
    loading = false,
    submitLabel = 'Add User'
}) => {
    const [formData, setFormData] = useState(getInitialFormData());
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Populate form with initial data for editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(getInitialFormData());
        }
        setErrors({});
        setTouched({});
    }, [initialData]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate on change if field was touched
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    // Handle input blur (mark as touched)
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        // Validate on blur
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        // Validate all fields
        const formErrors = validateForm(formData);
        setErrors(formErrors);

        // Mark all fields as touched
        const allTouched = USER_FIELDS.reduce((acc, field) => {
            acc[field.name] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        if (!isFormValid(formErrors)) {
            return;
        }

        // Submit the form
        const result = await onSubmit(formData);

        if (result.success) {
            setFormData(getInitialFormData());
            setTouched({});
            setErrors({});
            setSubmitSuccess(true);
        } else {
            setSubmitError(result.error);
        }
    };

    // Clear form
    const handleClear = () => {
        setFormData(getInitialFormData());
        setErrors({});
        setTouched({});
        setSubmitError(null);
    };

    // Get input type for MUI TextField
    const getInputType = (fieldType) => {
        switch (fieldType) {
            case 'tel':
                return 'tel';
            case 'email':
                return 'email';
            case 'date':
                return 'date';
            default:
                return 'text';
        }
    };

    return (
        <Box className="user-form-container">
            <form onSubmit={handleSubmit} noValidate>
                <Row className="g-3">
                    {USER_FIELDS.map(field => (
                        <Col key={field.name} xs={12} md={field.gridSize || 6}>
                            <Input
                                name={field.name}
                                label={field.label}
                                type={getInputType(field.type)}
                                value={formData[field.name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched[field.name] ? errors[field.name] : null}
                                placeholder={field.placeholder}
                                required={field.required}
                                disabled={loading}
                                multiline={field.type === 'textarea'}
                                rows={field.type === 'textarea' ? 3 : 1}
                            />
                        </Col>
                    ))}
                </Row>

                {submitError && (
                    <Alert severity="error" sx={{ mt: 2 }} onClose={() => setSubmitError(null)}>
                        {submitError}
                    </Alert>
                )}

                <Box className="form-actions" sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : submitLabel}
                    </Button>

                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        startIcon={<ClearIcon />}
                        onClick={handleClear}
                        disabled={loading}
                    >
                        Clear
                    </Button>
                </Box>
            </form>

            <Snackbar
                open={submitSuccess}
                autoHideDuration={3000}
                onClose={() => setSubmitSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setSubmitSuccess(false)}>
                    User saved successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserForm;
