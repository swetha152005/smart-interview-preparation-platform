# 🚀 Smart Interview Preparation Platform

A full-stack web application designed to help software engineering aspirants prepare for technical interviews through coding practice, MCQs, company-specific questions, bookmarks, and progress tracking.

## 🎯 Project Overview

Preparing for software interviews often requires using multiple platforms for coding problems, MCQs, company-specific questions, and progress tracking.

The **Smart Interview Preparation Platform** brings these preparation activities together into a single application.

Users can practice coding questions, take technical MCQ quizzes, explore company-wise interview questions, bookmark important problems, mark questions as solved, and monitor their preparation progress.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected routes
* Token-based user identification
* Automatic handling of invalid/expired tokens

### 💻 Coding Practice

* Browse coding questions
* Search questions by title
* Filter by difficulty
* Filter by topic
* View detailed coding problems
* Mark questions as solved
* Prevent duplicate solved entries

### 🔖 Bookmark Management

* Bookmark coding questions
* View all saved questions
* Remove bookmarks
* Bookmark count displayed on dashboard
* Bookmark state synchronized with the backend

### 📝 MCQ Practice

* Technical multiple-choice questions
* One-question-at-a-time quiz interface
* Previous / Next navigation
* Answer validation
* Automatic score calculation
* Percentage calculation
* Retry quiz functionality
* MCQ results stored in MySQL

### 🏢 Company-wise Preparation

Practice coding questions based on companies such as:

* Google
* Microsoft
* Amazon
* Infosys
* TCS
* Accenture
* Wipro
* Zoho

### 📊 Progress Tracking

Dashboard provides an overview of:

* Coding questions solved
* Latest MCQ score
* Saved bookmarks
* Detailed progress navigation

### 🎨 User Interface

* Responsive layout
* Card-based question interface
* Search and filtering
* Loading states
* Error handling
* Mobile-friendly design
* Consistent navigation

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* HTML5
* CSS3
* React Router
* Axios
* JWT Decode
* Vite

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication

### Database

* MySQL
* MySQL Workbench

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       React UI       │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                            Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Express Server    │
                    │       REST API       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │        MySQL         │
                    │      Database        │
                    └──────────────────────┘
```

---

## 📁 Project Structure

```text
Smart-Interview-Preparation-Platform/
│
├── client/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🗄️ Database Design

The application uses MySQL with separate tables for different application modules.

### Main Tables

| Table              | Purpose                        |
| ------------------ | ------------------------------ |
| `users`            | Stores registered users        |
| `coding_questions` | Stores coding problems         |
| `mcq_questions`    | Stores MCQ questions           |
| `mcq_results`      | Stores quiz results            |
| `bookmarks`        | Stores bookmarked questions    |
| `solved_questions` | Tracks solved coding questions |

### Relationship Overview

```text
users
  │
  ├── bookmarks ────────── coding_questions
  │
  ├── solved_questions ─── coding_questions
  │
  └── mcq_results
```

---

## 🔑 Authentication Flow

```text
User
 │
 │ Login
 ▼
Express API
 │
 │ Validate credentials
 ▼
MySQL
 │
 │ Valid user
 ▼
JWT Token
 │
 ▼
Frontend localStorage
 │
 ▼
Protected React Pages
```

The frontend decodes the JWT to identify the logged-in user and prevents unauthorized access to protected pages.

---

## 🔌 REST API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Coding Questions

```text
GET /api/questions/coding
GET /api/questions/coding/:id
GET /api/questions/coding/company/:company
```

### Solved Questions

```text
POST /api/questions/solved
GET /api/questions/solved/:userId/:questionId
GET /api/questions/solved/count/:userId
```

### MCQ

```text
GET /api/questions/mcq
POST /api/questions/mcq-result
GET /api/questions/mcq-result/:userId
```

### Bookmarks

```text
GET /api/bookmarks/:userId
POST /api/bookmarks
DELETE /api/bookmarks/:userId/:questionId
GET /api/bookmarks/count/:userId
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MySQL
* Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Smart-Interview-Preparation-Platform
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=interview_prep
JWT_SECRET=YOUR_SECRET_KEY
```

Start the backend:

```bash
node index.js
```

The server runs on:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on the Vite development server.

---

## 🧪 Testing

The application was tested by verifying:

* User registration
* User login
* JWT authentication
* Protected routes
* Coding question retrieval
* Search and filtering
* Bookmark creation and deletion
* Solved question tracking
* MCQ submission
* Score calculation
* MCQ result persistence
* Company-wise question filtering
* Dashboard progress statistics
* Invalid/expired authentication handling

API endpoints can also be tested using Postman.

---

## 🛡️ Error Handling

The application handles common failure scenarios including:

* Invalid login credentials
* Missing authentication token
* Invalid or expired JWT
* Duplicate solved questions
* Duplicate bookmarks
* Missing questions
* API request failures
* Empty question results
* Loading states during API requests

---

## 📱 Responsive Design

The frontend is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The interface uses responsive layouts for dashboards, question cards, quizzes, and bookmark lists.

---

## 📸 Screenshots

Add screenshots of the following pages here:

### Home Page

```text
[ Add Home Page Screenshot ]
```

### Login

```text
[ Add Login Screenshot ]
```

### Dashboard

```text
[ Add Dashboard Screenshot ]
```

### Coding Questions

```text
[ Add Coding Questions Screenshot ]
```

### MCQ Quiz

```text
[ Add MCQ Screenshot ]
```

### Company-wise Questions

```text
[ Add Company Questions Screenshot ]
```

### My Bookmarks

```text
[ Add Bookmarks Screenshot ]
```

---

## 🚀 Future Improvements

Planned improvements include:

* Online code editor with test-case execution
* More coding questions and MCQs
* Difficulty-based progress analytics
* Company-wise preparation statistics
* Leaderboard
* Interview simulation mode
* Admin dashboard for question management
* Password reset functionality
* Refresh-token based authentication
* Deployment with production database
* Automated testing and CI/CD

---

## 📚 What I Learned

Through this project, I gained practical experience in:

* Building a full-stack React application
* Designing REST APIs with Express.js
* Connecting Node.js with MySQL
* Implementing JWT authentication
* Managing application state with React hooks
* React routing and protected pages
* CRUD operations
* Database relationships
* API integration using Axios
* Error and loading state handling
* Git and GitHub workflow
* Debugging frontend and backend issues
* Designing responsive user interfaces

---

## 🎓 Project Goal

The main goal of this project is to create a practical interview preparation platform while gaining hands-on experience in full-stack web development, authentication, database management, API design, and frontend engineering.

---

## 👩‍💻 Author

**Swetha Marirajan**

Built as a full-stack software engineering project focused on interview preparation and practical web development.

```
```
