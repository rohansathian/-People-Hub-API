const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// POST /api/departments - Create a new department
router.post('/', departmentController.createDepartment);

// GET /api/departments - List all departments
router.get('/', departmentController.getDepartments);

// PUT /api/departments/:id - Update an existing department
router.put('/:id', departmentController.updateDepartment);

// DELETE /api/departments/:id - Delete a department (safeguarded)
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;