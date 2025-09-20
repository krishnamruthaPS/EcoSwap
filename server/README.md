# EcoSwap Backend

Express.js backend server for the EcoSwap platform with MongoDB integration.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Navigate to server directory:**
   \`\`\`bash
   cd server
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edit `.env` file with your actual values.

4. **Start MongoDB:**
   - **Local MongoDB:** `mongod`
   - **MongoDB Atlas:** Use connection string in MONGODB_URI

### Development

**Start development server:**
\`\`\`bash
npm run dev
\`\`\`

The server will start on `http://localhost:5000` with hot reload enabled.

**Build for production:**
\`\`\`bash
npm run build
npm start
\`\`\`

### API Endpoints

- **Health Check:** `GET /health`
- **Authentication:** `POST /api/auth/login`, `POST /api/auth/register`
- **Items:** `GET /api/items`, `POST /api/items`
- **Swaps:** `GET /api/swaps`, `POST /api/swaps`
- **Community:** `GET /api/community/posts`
- **Analytics:** `GET /api/analytics/dashboard`

### Testing

**Run tests:**
\`\`\`bash
npm test
\`\`\`

### Database

The server automatically connects to MongoDB on startup. Make sure your MongoDB instance is running and the connection string in `.env` is correct.

### Socket.IO

Real-time features are available at the same port as the HTTP server for notifications and live updates.
