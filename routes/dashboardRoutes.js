const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const [[{ totalEmployees }]] = await db.query('SELECT COUNT(*) as totalEmployees FROM employees');
    const [[{ activeEmployees }]] = await db.query("SELECT COUNT(*) as activeEmployees FROM employees WHERE status = 'Active'");
    const [[{ inactiveEmployees }]] = await db.query("SELECT COUNT(*) as inactiveEmployees FROM employees WHERE status = 'Inactive'");
    const [[{ totalDepartments }]] = await db.query('SELECT COUNT(*) as totalDepartments FROM departments');

    // Salary statistics
    const [[salaryStats]] = await db.query('SELECT AVG(salary) as averageSalary, SUM(salary) as totalPayroll FROM employees');

    // Department-wise distribution
    const [departmentBreakdown] = await db.query(`
      SELECT d.departmentName, COUNT(e.id) as employeeCount 
      FROM departments d 
      LEFT JOIN employees e ON d.id = e.departmentId 
      GROUP BY d.id
    `);

    res.status(200).json({
      summary: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        totalDepartments,
        averageSalary: parseFloat(salaryStats.averageSalary || 0).toFixed(2),
        totalPayroll: parseFloat(salaryStats.totalPayroll || 0).toFixed(2)
      },
      departmentBreakdown
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;