require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

/* -------------------- DB CONNECTION -------------------- */

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

/* -------------------- USER MODEL -------------------- */

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

/* -------------------- EXPRESS APP -------------------- */

const app = express();
app.use(cors());
app.use(express.json());

/* -------------------- VALIDATION -------------------- */

const userValidation = [
    body('firstName').notEmpty().withMessage('First name required'),
    body('lastName').notEmpty().withMessage('Last name required'),
    body('phone')
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone must be 10 digits'),
    body('email').isEmail().withMessage('Invalid email')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/* -------------------- ROUTES (CRUD) -------------------- */

// CREATE
app.post('/api/users', userValidation, validate, async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});

// READ
app.get('/api/users', async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
});

// UPDATE
app.put('/api/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(user);
});

// DELETE
app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
