# People Hub API

A robust, production-ready REST API developed with Node.js, Express, and MySQL to manage departments and employees efficiently[cite: 2].

## 🚀 Features Implemented
* **Department Management**: Create, Read, Update, and Safely Delete (prevents deletion if employees are attached)[cite: 2].
* **Employee Management**: Full CRUD with server-side validations (unique email/code checks, digit-only mobile check)[cite: 2].
* **Advanced Filtering**: Server-side pagination, global search, and filters for department and status[cite: 2].
* **Dashboard Analytics**: Real-time business statistics reporting employee counts, status distributions, and payroll data[cite: 2].
* **Centralized Error Handling**: Unified error response format for all asynchronous operations.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
Ensure you have the following installed on your local machine:
* Node.js (v16 or higher recommended)
* MySQL Server

### 2. Database Installation
1. Log into your MySQL instance and run the queries inside the `schema.sql` file provided in this project root to create the tables[cite: 2].
2. (Optional) Run any mock data inserts provided in the script.

### 3. Environment Configuration
Create a `.env` file in the root directory and update it with your database credentials:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=people_hub_db

```

### 4. Install Dependencies & Start Server

```bash
# Install dependencies
npm install

# Start the server
npm start

```

The server will start running on `http://localhost:3000`.

---

## 📁 Expected Folder Structure

This project strictly adheres to the requested architectural layout:

```text
people-hub/
├── config/          # Database configuration and connection pool[cite: 2]
├── controllers/     # Business logic handlers[cite: 2]
├── middlewares/     # Request validation filters and error handling[cite: 2]
├── routes/          # Express route definitions[cite: 2]
├── models/          # Database access layers[cite: 2]
├── .env             # Local environment variables (git ignored)[cite: 2]
├── app.js           # Express application entry point[cite: 2]
├── package.json     # Node project dependencies[cite: 2]
└── schema.sql       # Database schema initialization script[cite: 2]

```

---

## 📖 API Documentation

### Department Endpoints



* **POST** `/api/departments` - Create a new department (prevents duplicates).


* **GET** `/api/departments` - List all departments.


* **PUT** `/api/departments/:id` - Update an existing department.


* **DELETE** `/api/departments/:id` - Delete a department (prevented if employees exist).



### Employee Endpoints



* **POST** `/api/employees` - Add a new employee with strict validations.


* **GET** `/api/employees` - List employees with server-side pagination, search, department, and status filters.


* **GET** `/api/employees/:id` - Fetch specific employee details accompanied by their department name.


* **PUT** `/api/employees/:id` - Update an employee's details.


* **DELETE** `/api/employees/:id` - Remove an employee record.


* **PATCH** `/api/employees/:id/status` - Toggle employee status between 'Active' and 'Inactive'.



### Dashboard Endpoints



* **GET** `/api/dashboard` - Real-time structural employee and department statistics.
