# 🚀 Technical Assessment - AStudio

A full-stack project management and timesheet tracking application built with Laravel (Backend) and React (Frontend).

[📋 View Original Task Requirements](https://www.notion.so/Full-Stack-Task-AStudio-2888c72afd7580c7bae4ec182a2fc64b?source=copy_link)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Live Demo](#-live-demo)
- [Author](#-author)

---

## ✨ Features

### Backend (Laravel API)
- 🔐 **Authentication System** - JWT-based auth using Laravel Sanctum
- 👥 **User Management** - CRUD operations for users
- 📊 **Project Management** - Create, update, and track projects
- ⏱️ **Timesheet Tracking** - Log hours worked on projects
- 🔍 **Advanced Filtering** - Filter by date, status, department, etc.
- 📄 **Pagination** - Efficient data loading
- ✅ **Form Validation** - Comprehensive request validation
- 🎨 **API Resources** - Clean, structured JSON responses

### Frontend (React + Vite)
- 🎯 **Modern UI** - Built with Bootstrap 5
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔎 **Real-time Search** - Debounced search functionality
- 🎛️ **Dynamic Filters** - Filter by multiple criteria
- 📄 **Smart Pagination** - Navigate large datasets easily
- ⚡ **Performance Optimized** - Fast loading with React Query
- 🎨 **Custom Components** - Reusable UI components
- 🛡️ **Error Boundary** - Graceful error handling

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Laravel 11.x
- **Authentication:** Laravel Sanctum
- **Database:** MySQL
- **PHP Version:** 8.2+

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Bootstrap 5
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Routing:** React Router v6

---

## 📂 Project Structure

```
astudio-assessment/
├── Backend/              # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── API/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   └── Models/
│   ├── database/
│   │   └── migrations/
│   └── routes/
│       └── api.php
│
├── FrontEnd/            # React Application
│   ├── src/
│   │   ├── Components/
│   │   │   ├── DataTable/
│   │   │   ├── Filters/
│   │   │   ├── Pagination/
│   │   │   └── TopNav/
│   │   ├── Context/
│   │   ├── Pages/
│   │   └── styles/
│   └── vite.config.js
│
└── Docs/               # Documentation
    ├── astudio.sql
    └── Erd.png
```

---

## 🔧 Backend Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- MySQL 5.7+

### Installation Steps

1. **Navigate to Backend directory**
```bash
cd Backend
```

2. **Install Dependencies**
```bash
composer install
```

3. **Environment Configuration**
```bash
cp .env.example .env
```

4. **Configure Database**
Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=astudio
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. **Generate Application Key**
```bash
php artisan key:generate
```

6. **Run Migrations**
```bash
php artisan migrate
```

7. **Seed Database (Optional)**
```bash
php artisan db:seed
```

8. **Start Development Server**
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Available Artisan Commands

```bash
# Clear all caches
php artisan optimize:clear

# List all routes
php artisan route:list

# Generate API documentation
php artisan route:list --json
```

---

## 💻 Frontend Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Navigate to Frontend directory**
```bash
cd FrontEnd
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE=http://localhost:8000/api
```

4. **Start Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 📚 API Documentation

### Base URL
- **Local:** `http://localhost:8000/api`
- **Production:** `https://astudio-task-assessment-production.up.railway.app/api`

### Authentication Endpoints

#### Register
```http
POST /api/register
Content-Type: application/json

{
  "name": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "dob": "1990-01-01",
  "gender": "male",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /api/logout
Authorization: Bearer {token}
```

### Resource Endpoints

All endpoints below require authentication (`Authorization: Bearer {token}`)

#### Users
- `GET /api/users` - List all users
- `GET /api/users/{id}` - Get user details
- `POST /api/users` - Create new user
- `POST /api/users/update` - Update user
- `POST /api/users/delete` - Delete user

#### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/{id}` - Get project details
- `POST /api/projects` - Create new project
- `POST /api/projects/update` - Update project
- `POST /api/projects/delete` - Delete project

#### Timesheets
- `GET /api/timesheets` - List all timesheets
- `GET /api/timesheets/{id}` - Get timesheet details
- `POST /api/timesheets` - Create new timesheet
- `POST /api/timesheets/update` - Update timesheet
- `POST /api/timesheets/delete` - Delete timesheet

### Example Requests

**Create Project:**
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Mobile App Redesign",
  "department": "IT",
  "start_date": "2025-01-01",
  "end_date": "2025-06-30",
  "status": "active"
}
```

**Create Timesheet:**
```http
POST /api/timesheets
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 1,
  "project_id": 1,
  "task_name": "Frontend Development",
  "date": "2025-10-11",
  "hours": 8.5
}
```

### Full API Documentation
[📖 View Complete Postman Documentation](https://documenter.getpostman.com/view/2836787/2sB3QKtAm1)

---

## 🗄️ Database Schema

### Tables Overview

**users**
- id, name, first_name, last_name, dob, gender, email, password
- Relationships: hasMany timesheets, belongsToMany projects

**projects**
- id, name, department, start_date, end_date, status
- Relationships: hasMany timesheets, belongsToMany users

**time_sheets**
- id, user_id, project_id, task_name, date, hours
- Relationships: belongsTo user, belongsTo project

**project_user** (Pivot Table)
- id, user_id, project_id

### Entity Relationship Diagram

![Database ERD](https://github.com/yahongie2014/Astudio-Task-Assessment/blob/main/Docs/Erd.png)

---

## 🌐 Live Demo

### Deployed Applications

#### Backend API
- 🔗 **Railway:** [https://astudio-task-assessment-production.up.railway.app](https://astudio-task-assessment-production.up.railway.app)
- 📝 **API Docs:** [Postman Documentation](https://documenter.getpostman.com/view/2836787/2sB3QKtAm1)

#### Frontend Application
- 🔗 **Vercel:** [https://astudio-two.vercel.app](https://astudio-two.vercel.app)

### Demo Credentials
```
Email: john@example.com
Password: password123
```

---

## 📸 Screenshots

### Data Table Interface
![Data Table](https://github.com/yahongie2014/Astudio-Task-Assessment/blob/main/Docs/dataTable.png)

---

## 🧪 Testing

### Backend Tests
```bash
cd Backend
php artisan test
```

### Frontend Tests
```bash
cd FrontEnd
npm run test
```

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ CSRF protection
- ✅ SQL injection prevention via Eloquent ORM
- ✅ XSS protection
- ✅ Rate limiting on API endpoints
- ✅ Token-based authentication
- ✅ Input validation and sanitization

---

## 🚀 Deployment

### Backend (Railway/Heroku)

1. Set environment variables
2. Configure database connection
3. Run migrations: `php artisan migrate --force`
4. Deploy via Git hook

### Frontend (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables
5. Deploy automatically on push

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is part of a technical assessment and is for demonstration purposes.

---

## 👨‍💻 Author

**Ahmed Saeed**

- 🌐 Website: [coder79.me](https://www.coder79.me/)
- 💼 LinkedIn: [@devahmedsaeed](https://www.linkedin.com/in/devahmedsaeed/)
- 🎥 YouTube: [AhmedSaeedcoder79](https://www.youtube.com/AhmedSaeedcoder79/)
- 📧 Email: contact@coder79.me

---

## 🙏 Acknowledgments

- Laravel Community
- React Community
- AStudio for the opportunity
- All contributors and supporters

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star!**

Made with ❤️ by Ahmed Saeed

</div>