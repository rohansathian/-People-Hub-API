const { body, validationResult } = require('express-validator');
const db = require('../config/db');

const validateEmployee = [
  body('fullName').notEmpty().withMessage('Full Name is mandatory'),
  
  body('employeeCode')
    .notEmpty().withMessage('Employee Code is mandatory')
    .custom(async (value, { req }) => {
      const employeeId = req.params.id;
      let query = 'SELECT id FROM employees WHERE employeeCode = ?';
      const params = [value];
      
      if (employeeId) {
        query += ' AND id != ?';
        params.push(employeeId);
      }
      
      const [rows] = await db.query(query, params);
      if (rows.length > 0) {
        throw new Error('Employee Code must be unique');
      }
      return true;
    }),

  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .custom(async (value, { req }) => {
      const employeeId = req.params.id;
      let query = 'SELECT id FROM employees WHERE email = ?';
      const params = [value];
      
      if (employeeId) {
        query += ' AND id != ?';
        params.push(employeeId);
      }

      const [rows] = await db.query(query, params);
      if (rows.length > 0) {
        throw new Error('Email must be unique');
      }
      return true;
    }),

  body('mobile')
    .matches(/^\d+$/).withMessage('Mobile should contain only digits')
    .isLength({ min: 10, max: 15 }).withMessage('Mobile must be between 10 and 15 digits'),

  body('departmentId')
    .custom(async (value) => {
      const [rows] = await db.query('SELECT id FROM departments WHERE id = ?', [value]);
      if (rows.length === 0) {
        throw new Error('Department must exist');
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateEmployee };