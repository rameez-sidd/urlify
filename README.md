## Urlify - Fast & Simple URL Shortener

Urlify is a lightweight, full-stack URL shortener built with Node.js + Express, React (Vite), and PostgreSQL (Neon).
It allows users to create short links, manage them, track clicks, and view detailed statistics — similar to Bitly.

This project was built as part of a take-home assignment and follows all required specifications such as API routes, redirect behavior, UI states, and a clean, responsive interface.


## 🚀 Live Demo

🔗 Production URL: [Live Demo](https://urlify-a1l4.onrender.com/)


## 🎥 Project Walkthrough Video

📺 Add your Loom/YouTube link here


## 📚 Features
**⭐ Core Functionality**

  - Create short URLs with optional custom codes

  - Auto-generate random short codes

  - Validate long URLs before saving

  - Redirect using /:code (302 response)

  - Track:

    - total clicks

    - last clicked time

  - Delete links

  - Health check endpoint (/healthz)


## 🖥️ Frontend (React + Tailwind)

  - Clean, responsive UI

  - Inline validation & error handling

  - Copy-to-clipboard short URL

  - Table for all links

  - Stats page for individual links

  - Loading / empty / error states

  - Fully integrated with backend API


## ⚙️ Backend (Node + Express)

  - REST API

  - Neon Postgres connection

  - Modular structure (controllers, routes, models, middlewares)

  - 302 redirect handler

  - Global error handling middleware


## 🔧 Environment Variables

Create a .env file inside the server/ directory:

DATABASE_URL=your-neon-postgres-url

CORS_ORIGIN=https://your-frontend-url

PORT=10000


An .env.example file is included in the server directory.


## ▶️ Running Locally
**Backend**

    cd server
    npm install
    npm run dev

**Frontend**

    cd client
    npm install
    npm run dev


Frontend: http://localhost:5173

Backend: http://localhost:3000


## 🧪 API Endpoints
**Create Link**

    POST /api/links
    {
      "targetUrl": "https://example.com",
      "code": "custom123"
    }

**List All Links**

    GET /api/links

**Get Stats for One Link**

    GET /api/links/:code

**Delete Link**

    DELETE /api/links/:code

**Redirect**

    GET /:code

**Health Check**

    GET /healthz


## 🚀 Deployment

- **Backend + Frontend** → Render

- **Database** → Neon Postgres
