---

## 💾 2. The `schema.sql` File
Create a `schema.sql` file in your root folder. This ensures the evaluator has the exact schemas ready to execute:

```sql
CREATE DATABASE IF NOT EXISTS people_hub_db;
USE people_hub_db;

-- Table 1: departments
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: employees
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeCode VARCHAR(20) UNIQUE,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    mobile VARCHAR(15),
    departmentId INT,
    designation VARCHAR(100),
    salary DECIMAL(10,2),
    status ENUM('Active','Inactive') DEFAULT 'Active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (departmentId) REFERENCES departments(id)
);

-- Seed Data for Quick Testing
INSERT INTO departments (departmentName) VALUES ('Engineering'), ('Human Resources');
INSERT INTO employees (employeeCode, fullName, email, mobile, departmentId, designation, salary, status) 
VALUES ('EMP001', 'John Doe', 'john@example.com', '9876543210', 1, 'Software Engineer', 75000.00, 'Active');