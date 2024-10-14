# Authentication System with OAuth2 and Node.js

This project implements a secure user authentication system using **Node.js**, **Express**, and **OAuth2 with Google**. The system allows users to sign up, sign in, and authenticate via Google OAuth2, providing a seamless and secure login experience. The project also features session management for maintaining user states.

## Features

- User authentication via Google OAuth2.
- Secure session management.
- Sign up and sign in using email and password.
- Clean and structured codebase using **Express.js** for the backend.

## Project Structure

├── config/ │ └── passport.js # Passport.js configuration for Google OAuth2 ├── models/ │ └── User.js # Mongoose schema for user data ├── routes/ │ └── auth.js # Routes for authentication ├── views/ │ └── login.ejs # EJS view for login page ├── .env # Environment variables (not included in the repo) ├── app.js # Main Express app ├── package.json # Project dependencies └── README.md # Project documentation


## Prerequisites

- **Node.js** installed on your system.
- A **Google Developer** account to create OAuth2 credentials.
- **MongoDB** installed or a connection string to MongoDB Atlas.

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/Vijay2887/OAuth.git
    cd OAuth
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up a `.env` file in the root directory with the following variables:

    ```
    PORT=3000
    MONGO_URI=your_mongo_db_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    SESSION_SECRET=your_session_secret
    ```

4. Run the application:

    ```bash
    npm run start-dev
    ```

5. Open your browser and go to `http://localhost:3000` to access the application.

## Usage

- The home page will have options to log in via Google.
- If you sign in with Google, your information will be stored in the database, and you'll be authenticated.
- Users can sign out, and their session will be securely terminated.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **Passport.js**: Authentication middleware.
- **OAuth2**: Google authentication integration.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB.

