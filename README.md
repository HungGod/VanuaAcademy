# Vanua Academy Website

A modern, responsive website for Vanua Academy built with React (Vite) frontend and Express.js backend.

## Features

- Responsive design with Tailwind CSS
- Smooth scrolling navigation
- Enrollment form with backend API integration
- Qualifications display
- About Us section
- Social media integration

## Project Structure

```
VanuaAcademy/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets (images)
│   └── package.json
├── server/                 # Express backend
│   ├── routes/            # API routes
│   ├── data/              # JSON storage
│   ├── server.js          # Express server
│   └── package.json
└── package.json           # Root package.json
```

## Installation

1. Install all dependencies:
```bash
npm run install:all
```

Or install separately:
```bash
# Root dependencies
npm install

# Client dependencies
cd client
npm install

# Server dependencies
cd ../server
npm install
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run separately:

**Frontend (port 5173):**
```bash
npm run dev:client
# or
cd client && npm run dev
```

**Backend (port 3000):**
```bash
npm run dev:server
# or
cd server && npm run dev
```

### Production Build

Build the frontend:
```bash
cd client
npm run build
```

## API Endpoints

### POST /api/enroll
Submit an enrollment form.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "qualification": "Certificate in Massage Therapy",
  "paymentMethod": "Credit Card"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enrollment submitted successfully",
  "enrollment": {
    "id": "1234567890",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "qualification": "Certificate in Massage Therapy",
    "paymentMethod": "Credit Card",
    "submittedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### GET /api/health
Health check endpoint.

## Technologies Used

- **Frontend:**
  - React 18
  - Vite
  - React Router
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js
  - CORS
  - Body Parser
  - MongoDB

## License

Copyright 2025 Vanua Academy Ltd.

