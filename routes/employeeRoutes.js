const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { validateEmployee } = require('../middlewares/employeeValidator');

// GET /api/employees - Get paginated employees with search & filters
router.get('/', employeeController.getEmployees);

// GET /api/employees/:id - Get specific employee details (with department name)
router.get('/:id', employeeController.getEmployeeById);

// POST /api/employees - Add a new employee with strict validations
router.post('/', validateEmployee, employeeController.createEmployee);

// PUT /api/employees/:id - Update employee details with validations
router.put('/:id', validateEmployee, employeeController.updateEmployee);

// DELETE /api/employees/:id - Delete an employee record
router.delete('/:id', employeeController.deleteEmployee);

// PATCH /api/employees/:id/status - Toggle employee status (Active/Inactive)
router.patch('/:id/status', employeeController.updateEmployeeStatus);

module.exports = router;