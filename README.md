# 🚀 TalentIQ – MERN-Stack Interview & Coding Platform

[![GitHub](https://img.shields.io/badge/GitHub-Sreenu--y%2FTalentIQ-blue?style=flat&logo=github)](https://github.com/Sreenu-y/TalentIQ)
[![Technology Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Vite-brightgreen)](https://react.dev/)
[![Live Application](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue)](https://talent-iq-53ev.onrender.com)

A **production-ready MERN-stack interview platform** that simulates real technical interviews with **live coding, video calls, real-time chat, and automated code evaluation**. Built for developers, recruiters, and interviewers using modern, scalable technologies.

---

## ✨ Key Features

This platform supports **real-time technical interviews and solo coding practice**.

### 👨‍💻 For Candidates / Developers

- **🔐 Secure Authentication** – Clerk-based authentication.
- **🧑‍💻 VSCode-Powered Code Editor** – Familiar coding experience.
- **🧩 Practice Problems Mode** – Solo coding with test cases.
- **⚙️ Secure Code Execution** – Isolated execution environment.
- **🎯 Auto Evaluation** – Pass/Fail based on test cases.
- **🎉 Confetti on Success** – Instant visual feedback.
- **💬 Real-time Chat** – Interview communication.
- **📱 Responsive UI** – Works across all devices.

### 🧑‍💼 For Interviewers / Recruiters

- **🎥 1-on-1 Video Interview Rooms**
- **🔒 Room Locking** – Only two participants allowed.
- **🔊 Mic & Camera Controls**
- **🖥 Screen Sharing & Recording**
- **📊 Live Dashboard Stats**
- **🧠 Background Jobs** – Async interview workflows via Inngest.

---

## 🛠️ Technology Stack

| Category          | Technology                  | Description                          |
| ----------------- | --------------------------- | ------------------------------------ |
| **Frontend Core** | ⚛️ **React + Vite**         | Fast, modern frontend tooling.       |
|                   | ⚡ **TanStack Query**       | Data fetching & caching.             |
|                   | 🎨 **Tailwind CSS**         | Utility-first styling.               |
| **Backend Core**  | 🚀 **Node.js & Express.js** | REST API & server logic.             |
|                   | 🗄️ **MongoDB**              | NoSQL database.                      |
| **Auth**          | 🔐 **Clerk**                | Secure authentication.               |
| **Realtime**      | 🎥 **Stream API**           | Video, chat, and real-time features. |
| **Async Jobs**    | 🧠 **Inngest**              | Background and event-driven tasks.   |
| **DevOps**        | 🤖 **CodeRabbit**           | PR review & code optimization.       |
| **Deployment**    | 🚀 **Render**              | Free-tier friendly deployment.       |

---

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB**
- **npm**

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/SHAIKHANIF2004/talent-IQ.git
cd TalentIQ
```

2. **Install backend dependencies**

```
cd backend
npm install
```

3. **Install frontend dependencies**

```
cd ../frontend
npm install
```

## 🔧 Environment Setup

Create a `.env` file in both the backend and frontend directories.

### Backend (/backend/.env)

PORT=3000  
NODE_ENV=development  
DB_URL=your_mongodb_connection_url  
INNGEST_EVENT_KEY=your_inngest_event_key  
INNGEST_SIGNING_KEY=your_inngest_signing_key  
STREAM_API_KEY=your_stream_api_key  
STREAM_API_SECRET=your_stream_api_secret  
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key  
CLERK_SECRET_KEY=your_clerk_secret_key  
CLIENT_URL=http://localhost:5173  

### Frontend (/frontend/.env)

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key  
VITE_API_URL=http://localhost:3000/api  
VITE_STREAM_API_KEY=your_stream_api_key  


## ▶️ Run the Application

### Start Backend

```
cd backend
npm run dev
```

### Start Frontend (in a new terminal)

```
cd frontend
npm run dev
```

## 🌐 Live Application

🚀 Experience the platform live:

👉 https://talent-iq-53ev.onrender.com

## 📚 API Overview

- **Public Routes:** Authentication
- **Protected Routes:** Code execution, room management, dashboards, interview room access

## 🔮 Future Enhancements

- 🤖 AI-powered interview feedback
- 📊 Interview performance analytics
- 📝 Interview playback & recordings
- 🌍 Multi-language code execution support
- 👥 Team interview rooms

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 👨‍💻 Author

**Yelesam Sreenu**  
MERN-Stack Developer

- 📧 Email: srinuyelesam123@gmail.com
- 🐙 GitHub: [https://github.com/Sreenu-y](https://github.com/Sreenu-y)

---

⭐ **If you like this project, don’t forget to star the repository!**
