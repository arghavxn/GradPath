# 🎓 GradPath (Degree Navigator)
> A smart academic planning system that simplifies course scheduling and advisor collaboration.
GradPath is a full-stack academic planning platform designed to help students build, manage, and optimize their semester schedules with intelligent validation and advisor interaction.

---

## 🚀 Features

### 📚 Course Planning
- Drag-and-drop course scheduling
- Automatic prerequisite validation
- Credit limit enforcement
- Semester-based course filtering

### 🗓️ Schedule Management
- Save, load, and delete schedules
- Multiple plans per semester
- Timestamped versions

### ⚡ Smart Conflict Detection
- Detects time overlaps between courses
- Prevents invalid schedules in real-time

### 👩‍🏫 Advisor Integration
- Advisors can review student plans
- Status system: Draft / Approved / Changes Needed
- Advisor feedback/comments system

### 🔐 Authentication
- Secure login & registration using JWT
- User-specific data storage

---

## 🛠️ Tech Stack

Frontend:
- React.js
- Tailwind CSS
- @hello-pangea/dnd

Backend:
- Node.js
- Express.js

Database:
- PostgreSQL

Other:
- JWT Authentication
- REST API

---

## 🧠 System Architecture

Frontend (React)
↓
Backend API (Express)
↓
PostgreSQL Database

---
## 🔐 Login Page
<img width="1280" height="656" alt="image" src="https://github.com/user-attachments/assets/0b5c3252-ec6c-4120-a6c8-89c1f0c580cd" />

---

## ⚙️ Setup Instructions

1. Clone Repository

git clone https://github.com/your-username/gradpath.git
cd gradpath

2. Frontend Setup

npm install
npm start

3. Backend Setup

cd backend
npm install
npm start

4. Environment Variables

Create a .env file inside /backend:

DATABASE_URL=your_postgres_connection
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_api_key

---

## 📌 Key Contributions

- Full-stack architecture design
- Real-time schedule validation
- Advisor feedback system
- Secure authentication system
- PostgreSQL database design

---

## 🎯 Future Improvements

- AI-based course recommendations
- GPA prediction system
- Degree progress tracking
- Mobile UI improvements

---

## 👩‍💻 Author

Arghavan Noori  
Computer Science @ Mississippi Valley State University  

GitHub: https://github.com/arghavxn
LinkedIn: https://www.linkedin.com/in/arghavan-noori/

---

## 📄 License

This project is for academic and demonstration purposes.
