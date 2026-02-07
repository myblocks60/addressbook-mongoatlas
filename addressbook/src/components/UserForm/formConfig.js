// ⭐ EXTENSIBILITY: Add new fields here without modifying components
// To add a new field, simply add an object to USERNAME_FIELDS array
// The form will automatically render the new field

export const USER_FIELDS = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        validation: {
            minLength: 2,
            maxLength: 50,
            errorMessage: 'First name must be 2-50 characters'
        },
        placeholder: 'Enter first name',
        gridSize: 6 // Bootstrap column size (out of 12)
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        validation: {
            minLength: 2,
            maxLength: 50,
            errorMessage: 'Last name must be 2-50 characters'
        },
        placeholder: 'Enter last name',
        gridSize: 6
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        validation: {
            pattern: /^[0-9]{10}$/,
            errorMessage: 'Phone must be exactly 10 digits'
        },
        placeholder: '10-digit phone number',
        gridSize: 6
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Please enter a valid email address'
        },
        placeholder: 'your@email.com',
        gridSize: 6
    }
    // ⭐ TO ADD NEW FIELD: Simply add object here, e.g.:
    // {
    //   name: 'dateOfBirth',
    //   label: 'Date of Birth',
    //   type: 'date',
    //   required: false,
    //   validation: {},
    //   placeholder: '',
    //   gridSize: 6
    // },
    // {
    //   name: 'address',
    //   label: 'Address',
    //   type: 'textarea',
    //   required: false,
    //   validation: { maxLength: 200 },
    //   placeholder: 'Enter your address',
    //   gridSize: 12
    // }
];

// Generate initial empty form data from field config
export const getInitialFormData = () => {
    return USER_FIELDS.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});
};

// Get field names for display in list/table
export const getDisplayFields = () => {
    return USER_FIELDS.map(field => ({
        name: field.name,
        label: field.label
    }));
};
