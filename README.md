# 📘 MERN Address Book App

A fully functional **Address Book Web Application** built using the MERN Stack with **Redux Toolkit** state management and **JWT authentication**.  
Each user can securely manage their own list of saved addresses, edit them, delete them, and update account details.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- Login (JWT-based authentication)
- Logout
- Change Password
- Auto-login on refresh using stored access token
- Protected Routes (frontend + backend)

### 🏡 Address Book (User-Specific)

Each logged-in user has their own private address list.

✔ Add New Address  
✔ Edit Address  
✔ Delete Address  
✔ Get All Addresses  
✔ All actions fully secured using JWT middleware

### 🧰 Frontend Features

- Built with **React + Vite**
- **Redux Toolkit** for global state management
- Axios with interceptor for attaching access token
- Tailwind CSS UI
- Clean and responsive interface

### 🛠 Backend Features

- Node.js + Express API
- MongoDB (Mongoose)
- JWT Access Token & Refresh Token support
- Password hashing using bcrypt
- Authentication middleware
- RESTful API structure

---

## 🏗 Tech Stack

### Frontend

- React (Vite)
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
