# Express.js API with MongoDB

A simple Express.js backend application demonstrating CRUD operations for users and posts with MongoDB integration.

## Features

### User Routes
- Get all users
- Add new users (via JSON, URL params, or query strings)
- Get user by ID
- Update user by ID (via JSON, URL params, or query strings)
- Delete user by ID (via JSON, URL params, or query strings)

### Post Routes
- Get all posts
- Filter posts by title
- Add new posts
- Get post by ID
- Update post by ID
- Delete post by ID

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- DOMPurify for input sanitization
- Joi for request validation

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (or local MongoDB installation)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/DanielPodolsky/Express.js-learning.git
   cd Express.js-learning
   ```

2. Install dependencies
   ```
   npm install express mongoose dotenv dompurify jsdom joi
   npm install nodemon --save-dev
   ```

   Alternatively, you can simply run:
   ```
   npm install
   ```
   which will install all dependencies listed in package.json.

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   MONGODB_CLUSTER=your_cluster.mongodb.net
   MONGODB_OPTIONS=retryWrites=true&w=majority&appName=Cluster0
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
├── app.js                  # Main application entry point
├── models/                 # MongoDB models
│   ├── post.js             # Post schema and model
│   └── user.js             # User schema and model
├── routers/                # API routes
│   ├── post.js             # Post routes
│   └── user.js             # User routes
├── utils/                  # Utility functions
│   ├── databaseConnection.js  # MongoDB connection setup
│   └── sanitize.js         # Input sanitization setup
├── validation/             # Request validation schemas
│   ├── post.js             # Post validation
│   └── user.js             # User validation
└── README.md

```
## Notes

This is a learning project demonstrating Express.js REST API development with MongoDB. The code includes various approaches to handle input data (JSON body, URL parameters, query strings) along with proper validation and sanitization.
