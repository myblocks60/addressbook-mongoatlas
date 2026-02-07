import { USER_FIELDS } from '../components/UserForm/formConfig';

/**
 * Validate a single field value against its config
 * @param {string} fieldName - Name of the field
 * @param {string} value - Current value
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (fieldName, value) => {
    const fieldConfig = USER_FIELDS.find(f => f.name === fieldName);

    if (!fieldConfig) return null;

    // Required check
    if (fieldConfig.required && (!value || value.trim() === '')) {
        return `${fieldConfig.label} is required`;
    }

    // Skip further validation if empty and not required
    if (!value || value.trim() === '') return null;

    const { validation } = fieldConfig;

    // Min length check
    if (validation.minLength && value.length < validation.minLength) {
        return validation.errorMessage || `${fieldConfig.label} must be at least ${validation.minLength} characters`;
    }

    // Max length check
    if (validation.maxLength && value.length > validation.maxLength) {
        return validation.errorMessage || `${fieldConfig.label} must be at most ${validation.maxLength} characters`;
    }

    // Pattern check (regex)
    if (validation.pattern && !validation.pattern.test(value)) {
        return validation.errorMessage || `${fieldConfig.label} is invalid`;
    }

    return null;
};

/**
 * Validate all form fields
 * @param {object} formData - Object with field values
 * @returns {object} - Object with field names as keys and error messages as values
 */
export const validateForm = (formData) => {
    const errors = {};

    USER_FIELDS.forEach(field => {
        const error = validateField(field.name, formData[field.name]);
        if (error) {
            errors[field.name] = error;
        }
    });

    return errors;
};

/**
 * Check if form has any errors
 * @param {object} errors - Errors object from validateForm
 * @returns {boolean} - True if form is valid (no errors)
 */
export const isFormValid = (errors) => {
    return Object.keys(errors).length === 0;
};
