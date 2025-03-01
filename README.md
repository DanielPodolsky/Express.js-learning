# Express.js API with MongoDB & JWT Authentication

A robust Express.js backend application demonstrating CRUD operations for users and posts with MongoDB integration, along with JWT-based authentication and authorization.

## Features

### Authentication Routes
- User registration with password hashing
- User login with JWT token generation
- Role-based authorization (Admin vs Regular users)

### User Routes
- Get all users
- Add new users (via JSON, URL params, or query strings)
- Get user by ID
- Update user by ID (via JSON, URL params, or query strings)
- Delete user by ID (via JSON, URL params, or query strings)

### Post Routes
- Get all posts (public access)
- Add new posts (authenticated users only)
- Delete posts (admin users only)

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- DOMPurify for input sanitization
- Joi for request validation

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (or local MongoDB installation)
- JWT secret key (for token generation)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/DanielPodolsky/Express.js-learning.git
   cd Express.js-learning
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   MONGODB_CLUSTER=your_cluster.mongodb.net
   MONGODB_OPTIONS=retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

Start the server with nodemon for automatic reloading during development:
```
nodemon app.js
```

The server will start on port 3000.

## Project Structure

```
express-api-mongo/
├── app.js                      # Main application entry point
├── models/                     # MongoDB models
│   ├── user.js                 # User schema and model
│   └── userAuth.js             # User authentication schema and model
├── routers/                    # API routes
│   ├── post.js                 # Post routes with authentication
│   ├── user.js                 # User CRUD routes
│   └── userAuth.js             # Authentication routes
├── utils/                      # Utility functions
│   ├── databaseConnection.js   # MongoDB connection setup
│   ├── sanitize.js             # Input sanitization setup
│   └── token.js                # JWT token generation and verification
├── validation/                 # Request validation schemas
│   ├── user.js                 # User validation schemas
│   └── userAuth.js             # Authentication validation schemas
└── README.md

```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- Input sanitization to prevent XSS attacks
- Request validation with Joi
- Role-based access control

## Notes

This project demonstrates a variety of Express.js features including:
- Multiple ways to handle input data (JSON body, URL parameters, query strings)
- Proper validation and sanitization
- Authentication and authorization
- Database integration with MongoDB/Mongoose
- Middleware-based route protection
