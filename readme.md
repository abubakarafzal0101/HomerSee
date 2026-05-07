# HomerSee

## Project Overview

HomerSee is a modern full-stack real estate booking application built with the MERN stack. It enables users to discover property listings, create accounts, save bookings, manage listings, and communicate securely. The application demonstrates strong practical experience in building production-ready web applications using React, Node.js, Express, MongoDB, and cloud media management.

## Key Features

- Responsive frontend built with React and Vite
- Secure user authentication and registration
- Listing creation, editing, and deletion for property owners
- Property browsing and single listing detail view
- Bookings management for logged-in users
- User profile and booking history management
- Cloudinary integration for image upload and storage
- Protected API routes with authentication middleware
- Organized MVC-style backend structure

## Why This Project

HomerSee is designed to showcase a real estate booking platform with a clean user experience, strong backend architecture, and cloud media support. It is also optimized for hiring managers and recruiters who want to see an end-to-end project that includes:

- Authentication and authorization
- RESTful API design
- Data persistence with MongoDB
- File uploads and third-party cloud storage
- Context-driven React state management
- Deployment-ready configuration using Vercel-compatible settings

## Tech Stack

- Frontend: React, Vite, JSX, CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT-based auth middleware
- File Uploads: Cloudinary
- Deployment Config: Vercel

## Project Structure

- `backend/` - API server with routing, controllers, middleware, and models
- `frontend/` - React client with pages, components, and context providers

### Backend Structure

- `backend/index.js` - server entry point
- `backend/config/db.js` - MongoDB connection
- `backend/config/cloudinary.js` - Cloudinary setup
- `backend/controllers/` - request handlers
- `backend/middlewares/` - authentication and file handling
- `backend/models/` - Mongoose schemas
- `backend/routes/` - API route definitions

### Frontend Structure

- `frontend/src/App.jsx` - main router and layout
- `frontend/src/main.jsx` - React DOM entry point
- `frontend/src/pages/` - routed pages such as Home, Login, Register, Profile
- `frontend/src/components/` - reusable UI components and homepage sections
- `frontend/src/contexts/` - state management using React Context

## Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance or Atlas cluster
- Cloudinary account for image storage

### Setup Backend

1. Open a terminal in the `backend/` folder.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file and add your values:

```env
MONGO_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server:

```bash
npm run dev
```

### Setup Frontend

1. Open a terminal in the `frontend/` folder.
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Create a `.env` file if needed and configure frontend environment variables.
4. Start the frontend app:

```bash
npm run dev
```

## Usage

- Register a new user account.
- Login and create or browse property listings.
- Upload images for listings using Cloudinary integration.
- Book an available property and manage bookings from the dashboard.
- Update your profile information and review previous bookings.

## Deployment

This project is configured for deployment to Vercel, with separate `vercel.json` files in both `backend/` and `frontend/`. To deploy:

- Deploy the frontend to Vercel from the `frontend/` directory.
- Deploy the backend with API routes or a separate server deployment platform.
- Ensure environment variables are configured in the deployment dashboard.

## Future Enhancements

- Add search, filtering, and sorting for property listings
- Implement user roles (admin, host, guest)
- Add booking payment integration
- Improve listing categories and advanced filters
- Add email notifications for bookings

## Contact

If you are interested in hiring for a MERN developer role or want to discuss this project further, please contact:

- Email: abubakarafzal0101@gmail.com

---

## About the Developer

I build practical web applications with a focus on clean UI, maintainable code, and real-world functionality. HomerSee is a polished demonstration of my ability to build full-stack solutions, integrate third-party services, and structure code for readability and scalability.
