import React from 'react';
import { Button as MuiButton } from '@mui/material';

/**
 * Reusable Button component wrapping MUI Button
 */
const Button = ({
    children,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    startIcon,
    endIcon,
    fullWidth = false,
    disabled = false,
    onClick,
    type = 'button',
    sx = {},
    ...props
}) => {
    return (
        <MuiButton
            variant={variant}
            color={color}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            fullWidth={fullWidth}
            disabled={disabled}
            onClick={onClick}
            type={type}
            sx={{
                textTransform: 'none',
                fontWeight: 500,
                ...sx
            }}
            {...props}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
