# 📒 NoteHive – MERN Notes Application

## 📌 Project Overview

NoteHive is a full-stack Notes Management Web Application built using Node.js, React.js, and MySQL.  
The application allows authenticated users to create, edit, delete, and manage personal notes securely.

This project demonstrates:

- Full-stack development  
- Authentication & Authorization  
- RESTful API development  
- Database design & integration  
- Logging with Pino  
- Exception handling  
- Unit testing (Backend + Frontend)  
- SonarQube integration  
- Git branching strategy  

---

## 🛠️ Technology Stack

### 🔹 Backend

- Node.js  
- Express.js  
- MySQL  
- Pino Logger  
- Mocha + Chai (Unit Testing)  
- JWT Authentication  
- SonarQube  

### 🔹 Frontend

- React.js  
- React Router DOM  
- Axios  
- Jest + React Testing Library  

### 🔹 Tools

- Git & GitHub  
- Postman  
- SonarQube  
- VS Code  

---

## ✨ Key Features

### 🔐 1. User Authentication & Authorization

- User Signup  
- User Login  
- JWT-based authentication  
- Protected routes  
- Logout functionality  
- Notes linked to authenticated users  

---

### 📝 2. Notes Management (CRUD)

Users can:

- Create new notes  
- View all personal notes  
- Edit existing notes  
- Delete notes  

Each note belongs to a specific authenticated user.

---

### 📊 3. Dashboard

After login, users are redirected to the dashboard where they can:

- View all their notes  
- Navigate to note editor  
- Create new note  
- Edit or delete notes  

---

### ✍️ 4. Note Editor

- Create or edit notes  
- Save changes to backend  
- Cancel and return to dashboard  

---

### 👤 5. User Profile

- Displays user email  
- Logout button  

---

## 🗄️ Database Design (MySQL)

### Tables:

### Users

- id (Primary Key)  
- name  
- email  
- password  
- created_at  

### Notes

- id (Primary Key)  
- title  
- content  
- user_id (Foreign Key)  
- created_at  
- updated_at  

### Relationship:

One User → Many Notes  

---

## 📡 Backend Architecture

```
backend/
│
├── controllers/
├── services/
├── routes/
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorHandler.js
├── config/
├── tests/
└── server.js
```

### Backend Responsibilities

- REST APIs (CRUD)  
- Authentication Middleware  
- Global Exception Handling  
- Pino Logging  
- Database Integration  
- Unit Testing  

---

## 🌐 Frontend Architecture

```
frontend/
│
├── components/
│   ├── auth/
│   ├── notes/
│   ├── profile/
├── pages/
├── services/
├── tests/
└── App.js
```

### Frontend Responsibilities

- UI Rendering  
- Routing  
- API Integration  
- Protected Routes  
- Form Handling  
- Unit Testing  

---

## 🧾 REST API Endpoints

### 🔐 Auth Routes

| Method | Endpoint              | Description      |
|--------|----------------------|------------------|
| POST   | /api/auth/signup     | Register user    |
| POST   | /api/auth/login      | Login user       |

---

### 📝 Notes Routes (Protected)

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | /api/notes       | Get all user notes  |
| POST   | /api/notes       | Create new note     |
| PUT    | /api/notes/:id   | Update note         |
| DELETE | /api/notes/:id   | Delete note         |

---

## 📜 Logging (Pino Logger)

Implemented using Pino Logger.

Logs include:

- HTTP Requests  
- HTTP Responses  
- Errors  
- User actions  
- Authentication events  
- Server startup  

All exceptions are logged for debugging and monitoring.

---

## ⚠️ Global Exception Handling

A centralized error-handling middleware is implemented to:

- Catch unexpected errors  
- Send meaningful responses  
- Log errors using Pino  
- Prevent server crashes  

---

## 🧪 Unit Testing

### Backend Testing (Mocha + Chai)

- Tested Controllers  
- Tested Services  
- Tested CRUD operations  
- Tested Authentication logic  

Command:

```
npm test
```

---

### Frontend Testing (Jest + React Testing Library)

- Component rendering tests  
- Button existence tests  
- Form validation checks  
- Routing tests  

Run:

```
npm test
```

---

## 📈 SonarQube Integration

SonarQube is configured to:

- Analyze JavaScript code  
- Detect code smells  
- Identify bugs  
- Improve code quality  
- Monitor maintainability  

This ensures professional-level code standards.

---

## 🔄 Git Branching Strategy

The project follows structured branching:

### Main Branches

- main → Production-ready code  
- develop → Integration branch  

### Feature Branches

- feature/backend/notes-crud-auth  
- feature/frontend/notes-ui  
- feature/backend/unit-testing  

Each feature is developed separately and merged via Pull Requests.

---

## 🚀 How to Run the Project

### 🔹 Backend Setup

```
cd backend
npm install
npm start
```

Server runs on:  
http://localhost:5000  

---

### 🔹 Frontend Setup

```
cd frontend
npm install
npm start
```

App runs on:  
http://localhost:3000  

---

## 📷 Application Screens

### 1️⃣ Signup / Login

- User registration  
- User authentication  
- Redirect to dashboard  

---

### 2️⃣ Dashboard

- List of notes  
- Create note button  
- Edit/Delete options  

---

### 3️⃣ Note Editor

- Create or edit note  
- Save to backend  
- Cancel functionality  

---

### 4️⃣ Profile Page

- User email  
- Logout  

---

## 👩‍💻 Author

Mariam  
MERN Stack Developer Intern  
10P SHINE  


