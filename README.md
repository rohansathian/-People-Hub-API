# People Hub API

A robust, production-ready REST API developed with Node.js, Express, and MySQL to manage departments and employees efficiently.

## 🚀 Features Implemented

- **Department Management**: Create, Read, Update, and Safely Delete (prevents deletion if employees are attached).
- **Employee Management**: Full CRUD with server-side validations (unique email/code checks, digit-only mobile check).
- **Advanced Filtering**: Server-side pagination, global search, and filters for department and status.
- **Dashboard Analytics**: Real-time business statistics reporting employee counts, status distributions, and payroll data.
- **Centralized Error Handling**: Unified error response format for all asynchronous operations.

---

## 🛠️ Setup Instructions

### 1. Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

### 2. Database Installation

1. Log into your MySQL instance and run the queries inside the `schema.sql` file provided in this project root to create the tables.
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
