# Password Reset Flow

A full-stack Password Reset Flow application built using React, Node.js, Express, and MongoDB.

## Features

- User Registration
- User Login
- Forgot Password
- Password Reset via Email
- Secure Reset Token Generation
- Token Expiry Validation
- Password Hashing using bcrypt
- Email Sending using Nodemailer
- Error Handling
- Responsive UI

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Nodemailer

## Project Structure

```
password-reset-flow
│
├── frontend
│
└── backend
```

## Environment Variables

### Frontend

```env
VITE_API_URL=your_backend_url
```

### Backend

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
FRONTEND_URL=your_frontend_url
```

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```