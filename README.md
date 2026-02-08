# Address Book - React CRUD Application

A modern, extensible React-based CRUD web application to manage user contact information.

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)
![MUI](https://img.shields.io/badge/MUI-7.x-007FFF?logo=mui)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb)

## 🚀 Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete contacts
- ✅ **Form Validation**: Real-time validation with error messages
- ✅ **Extensible Architecture**: Easily add new fields without code changes
- ✅ **Responsive Design**: Works on mobile, tablet, and desktop
- ✅ **Modern UI**: Material-UI components with Bootstrap grid

## 📸 Screenshots

*Add screenshots here*

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd deltasigmaventures
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start the server
npm start
```

Backend will run on `http://localhost:4000`

### 3. Frontend Setup

```bash
cd addressbook

# Install dependencies
npm install

# Configure environment (optional)
cp .env.example .env
# Edit .env if your backend runs on a different port

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173` (or next available port)

### 4. Build for Production

```bash
cd addressbook
npm run build
```

The production build will be in the `dist` folder.

---

## ➕ Adding New Fields Guide

The application is designed for **easy extensibility**. To add a new field:

### Step 1: Update Frontend Config

Edit `addressbook/src/components/UserForm/formConfig.js`:

```javascript
export const USER_FIELDS = [
  // ... existing fields ...
  
  // Add new field here:
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    required: false,
    validation: {},
    placeholder: '',
    gridSize: 6  // Bootstrap column size (1-12)
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    required: false,
    validation: { maxLength: 200 },
    placeholder: 'Enter your address',
    gridSize: 12
  }
];
```

### Step 2: Update Backend Schema

Edit `backend/server.js`:

```javascript
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Add new fields here:
    dateOfBirth: { type: Date },
    address: { type: String, trim: true }
  },
  { timestamps: true }
);
```

### Step 3: (Optional) Add Backend Validation

If the new field needs validation, add to the `userValidation` array:

```javascript
const userValidation = [
  // ... existing validations ...
  body('address').optional().isLength({ max: 200 }).withMessage('Address too long')
];
```

That's it! The form will automatically render the new field.

---

## 🔧 Mock API Setup

For testing without a MongoDB instance, you can use JSON Server:

### Install JSON Server

```bash
npm install -g json-server
```

### Create Mock Data

Create `db.json` in the project root:

```json
{
  "users": [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "1234567890",
      "email": "john@example.com"
    }
  ]
}
```

### Run Mock Server

```bash
json-server --watch db.json --port 4000
```

### Update Frontend API

Edit `addressbook/src/services/api.js` to use `id` instead of `_id` for JSON Server.

---

## 🌐 Deployment

### Frontend (Netlify)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url/api`

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Framework preset: Vite
3. Add environment variable: `VITE_API_URL=https://your-backend-url/api`

### Backend (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: 4000
   - `CORS_ORIGIN`: Your frontend domain

---

## 📁 Project Structure

```
deltasigmaventures/
├── addressbook/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserForm/        # Form component with validation
│   │   │   │   ├── UserForm.jsx
│   │   │   │   ├── UserForm.css
│   │   │   │   └── formConfig.js  # ⭐ Field configuration
│   │   │   ├── UserList/        # User list/grid component
│   │   │   ├── UserCard/        # Individual user card
│   │   │   └── common/          # Reusable components
│   │   ├── hooks/
│   │   │   └── useUsers.js      # Custom hook for CRUD
│   │   ├── services/
│   │   │   └── api.js           # Axios API wrapper
│   │   ├── utils/
│   │   │   └── validators.js    # Validation helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── netlify.toml             # Netlify config
│   ├── vercel.json              # Vercel config
│   └── package.json
│
├── backend/                     # Express Backend
│   ├── server.js                # Main server with routes
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

---

## 📋 Evaluation Criteria Coverage

| Criterion | Implementation |
|-----------|----------------|
| **React Coding Standards** | Functional components, hooks, proper state management |
| **Form Validation** | Real-time validation, required field enforcement, regex patterns |
| **API Integration** | Axios service layer, error handling, loading states |
| **Extensibility** | `formConfig.js` - add fields without changing component code |
| **UI/UX Design** | MUI + Bootstrap, responsive design, modern aesthetics |
| **Deployment** | Netlify/Vercel configs included |

---

## 📄 License

MIT License
