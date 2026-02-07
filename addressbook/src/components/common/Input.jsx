import React from 'react';
import { TextField } from '@mui/material';

/**
 * Reusable Input component wrapping MUI TextField
 */
const Input = ({
    name,
    label,
    type = 'text',
    value,
    onChange,
    error,
    helperText,
    placeholder,
    required = false,
    disabled = false,
    fullWidth = true,
    size = 'medium',
    multiline = false,
    rows = 1,
    ...props
}) => {
    return (
        <TextField
            name={name}
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error || helperText}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            variant="outlined"
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                }
            }}
            {...props}
        />
    );
};

export default Input;
