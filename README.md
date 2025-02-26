# Express.js API Demo

A simple Express.js backend application demonstrating basic CRUD operations for users and posts.

## Features

### User Routes
- Get all users
- Add a new user (auto-incremented ID)
- Get user by ID
- Update user by ID
- Delete user by ID

### Post Routes
- Get all posts
- Filter posts by title
- Add a new post (auto-incremented ID)
- Get post by ID
- Update post by ID
- Delete post by ID

## Getting Started

### Prerequisites
- Node.js installed on your machine
- npm (Node Package Manager)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/express-api-demo.git
   cd express-api-demo
   ```

2. Install dependencies
   ```
   npm install
   npm install nodemon --save-dev
   ```

### Running the Application

Start the server with nodemon for automatic reloading during development:
```
nodemon app.js
```

The server will start on port 3000 (or your configured port).

## Project Structure

```
express-api-demo/
├── app.js              # Main application entry point
├── routes/
│   ├── users.js        # User routes
│   └── posts.js        # Post routes
├── package.json
└── README.md
```

## Notes

This is a small demo project meant for learning Express.js basics. It uses in-memory arrays instead of a database for simplicity.
