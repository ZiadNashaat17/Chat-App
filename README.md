# Chat-App 💬

A real-time chat application built with Node.js, Express, MongoDB, Socket.IO, and Redis. Features private and group chat rooms with real-time messaging, user authentication, and online status tracking.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Private & Group Chats**: Create one-on-one conversations or group chat rooms
- **User Authentication**: Secure JWT-based authentication system
- **Online Status**: Real-time user presence tracking
- **Redis Caching**: Fast data retrieval with Redis caching layer
- **Email Integration**: SendGrid email service for notifications
- **Modern UI**: Clean and responsive web interface
- **Secure**: Helmet.js for security headers and bcrypt for password hashing
- **Advanced Logging**: Pino logger for high-performance structured logging

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v22 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cluster)
- [Redis](https://redis.io/) (local instance)
- [SendGrid Account](https://sendgrid.com/) (for email features)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZiadNashaat17/Chat-App.git
   cd Chat-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `config.env` file in the root directory with the following variables:
   ```env
   # Server Config
   NODE_ENV=development
   PORT=8000

   # Database
   DATABASE=your_mongodb_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=30d

   # Redis
   REDIS_URL=redis://localhost:6379

   # SendGrid Email
   SENDGRID_API_KEY=your_sendgrid_api_key
   EMAIL_FROM=your_email@example.com

   # Base URL
   BASE_URL=http://localhost:8000/
   ```

4. **Start Redis server** (if running locally)
   ```bash
   redis-server
   ```

## 🚦 Usage

### Development Mode
```bash
npm run start-dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:8000`

## 📁 Project Structure

```
Chat-App/
├── public/                 # Static files (HTML, CSS, JS)
│   ├── index.html         # Main UI
│   ├── main.js            # Client-side logic
│   └── styles.css         # Styling
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   ├── messagesController.js
│   │   └── userController.js
│   ├── middlewares/       # Custom middleware
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   ├── cleanCache.js
│   │   ├── globalErrorHandler.js
│   │   └── validateMessages.js
│   ├── models/           # Database schemas
│   │   ├── chatModel.js
│   │   ├── messagesModel.js
│   │   └── userModel.js
│   ├── routes/           # API routes
│   │   ├── chatRoutes.js
│   │   ├── messagesRoutes.js
│   │   └── userRoutes.js
│   ├── services/         # Business logic
│   │   ├── email.js
│   │   ├── redisCache.js
│   │   └── socket.js
│   ├── util/             # Utility functions
│   │   ├── appError.js
│   │   ├── filterObj.js
│   │   ├── generateEmailTemplate.js
│   │   └── logger.js
│   ├── app.js            # Express app configuration
│   └── server.js         # Server entry point
├── config.env            # Environment variables
├── package.json          # Dependencies and scripts
└── biome.json           # Biome configuration
```

## 🔌 API Endpoints

### Authentication & Users
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login user
- `GET /api/user/profile` - Get user profile (protected)
- `PATCH /api/user/profile` - Update user profile (protected)

### Chats
- `GET /api/chats` - Get all user chats (protected)
- `POST /api/chats` - Create a new chat (protected)
- `GET /api/chats/:id` - Get specific chat details (protected)
- `DELETE /api/chats/:id` - Delete a chat (protected)

### Messages
- `GET /api/messages/:chatId` - Get all messages for a chat (protected)
- `POST /api/messages` - Send a new message (protected)
- `DELETE /api/messages/:id` - Delete a message (protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

For Socket.IO connections, pass the token in the authentication handshake:
```javascript
const socket = io('http://localhost:8000', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

## 📡 Socket.IO Events

### Client → Server
- `join-chat` - Join a specific chat room
- `leave-chat` - Leave a chat room
- `send-message` - Send a message to a chat
- `typing` - Notify typing status
- `stop-typing` - Stop typing notification

### Server → Client
- `user-status-changed` - User online/offline status update
- `new-message` - Receive a new message
- `message-deleted` - Message deletion notification
- `typing-indicator` - Someone is typing
- `stop-typing-indicator` - Typing stopped

## 🧰 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO
- **Caching**: Redis
- **Authentication**: JWT, bcrypt
- **Email**: SendGrid
- **Security**: Helmet.js, CORS
- **Logging**: Pino, Morgan
- **Code Quality**: Biome

## 📝 Scripts

- `npm start` - Start production server
- `npm run start-dev` - Start development server with nodemon
- `npm run format` - Format code with Biome
- `npm run lint-format` - Lint and format code

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Ziad Nashaat**

- GitHub: [@ZiadNashaat17](https://github.com/ZiadNashaat17)

## 📄 License

This project is licensed under the ISC License.

## ⚠️ Security Note

**Important**: Never commit sensitive information like API keys, database credentials, or JWT secrets to version control. The `config.env` file should be added to `.gitignore`.

## 🐛 Known Issues

- Make sure Redis is running before starting the application
- Ensure MongoDB connection string is correct and database is accessible
- SendGrid API key must be valid for email features to work

## 📞 Support

For support, email znashaat29@gmail.com or open an issue in the GitHub repository.
