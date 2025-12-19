# IntervAI

IntervAI is an AI-powered interview preparation platform that analyzes resumes, conducts mock interviews, evaluates answers in real time, and generates detailed interview summaries.

---

## Features

- Secure authentication (JWT + HTTP-only cookies)
- Resume upload and AI-based resume analysis
- Personalized AI interview questions
- Answer evaluation after each question
- Final interview summary with strengths, weaknesses, and recommendations
- Protected routes and session handling
- Clean dashboard with sidebar navigation

---

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (file uploads)
- Google Gemini AI (Pro & Flash models)

---

## Project Structure

```
frontend/
 ├── src/
 │   ├── api/
 │   ├── components/
 │   ├── context/
 │   ├── layouts/
 │   ├── pages/
 │   ├── routes/
 │   └── App.jsx

backend/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── models/
 ├── ai/
 └── server.js
```

---

## Authentication Flow

1. User logs in or signs up
2. Backend sets an HTTP-only JWT cookie
3. Frontend restores session using `/api/auth/me`
4. Protected routes ensure security

---

## Interview Flow

1. Upload resume (PDF)
2. Resume text is parsed and analyzed by AI
3. Interview session is created
4. AI asks 5 personalized questions
5. Each answer is evaluated
6. Final interview summary is generated

---

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
GEMINI_API_KEY=your_google_ai_key
```

---

## Running the Project Locally

### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## Status

This project is actively under development.
Some AI features depend on external API availability.

---

## License

This project is for educational and portfolio purposes.
