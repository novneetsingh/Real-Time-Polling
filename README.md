# Real Time Polling Application

A real-time polling application that allows users to create polls, vote, and see results update in real-time using Socket.IO.

## Features

- **User Authentication**: Register user functionality
- **Create Polls**: Users can create polls with multiple options
- **Real-time Updates**: Poll results update in real-time using Socket.IO
- **Vote on Polls**: Users can vote on polls

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
Real Time Polling/
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── config/                 # Configuration files
│   └── prisma.js           # Prisma client configuration
├── controllers/            # Request handlers
│   ├── poll.controller.js  # Poll related controllers
│   ├── user.controller.js  # User related controllers
│   └── vote.controller.js  # Vote related controllers
├── index.js                # Main application entry point
├── package.json            # Project dependencies
├── prisma/                 # Prisma ORM files
│   ├── migrations/         # Database migrations
│   └── schema.prisma       # Database schema
├── routes/                 # API routes
│   ├── poll.route.js       # Poll related routes
│   ├── user.route.js       # User related routes
│   └── vote.route.js       # Vote related routes
└── socket.js               # Socket.IO configuration
```

## Getting Started

### Installation

1. Clone the repository

   ```
   git clone https://github.com/novneetsingh/Real-Time-Polling.git
   cd Real-Time-Polling
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/polling_db"

   ```

4. Run database migrations

   ```
   npx prisma migrate dev
   ```

5. Start the server
   ```
   npm start
   ```

## API Endpoints

### User Routes

- `POST /users/register` - Register a new user

### Poll Routes

- `GET /polls` - Get all polls
- `POST /polls` - Create a new poll

### Vote Routes

- `POST /votes` - Cast a vote

## Socket Events

- `joinPoll` - Emitted when a user joins a poll using pollId
- `leavePoll` - Emitted when a user leaves a poll using pollId
- `disconnect` - Emitted when a user disconnects
- `pollResults` - Emitted when poll results are updated

## License

This project is licensed under the MIT License.
