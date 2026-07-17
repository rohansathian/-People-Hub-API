const db = require('../config/db');

// 1. LIST DEPARTMENTS (This is what is currently breaking your code)
exports.getDepartments = async (req, res, next) => {
  try {
    const [departments] = await db.query('SELECT * FROM departments');
    res.status(200).json(departments);
  } catch (err) {
    next(err);
  }
};

// 2. CREATE DEPARTMENT
exports.createDepartment = async (req, res, next) => {
  try {
    const { departmentName } = req.body;
    if (!departmentName) {
      return res.status(400).json({ message: 'Department name is required' });
    }
    const [existing] = await db.query('SELECT id FROM departments WHERE departmentName = ?', [departmentName]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Department already exists' });
    }
    const [result] = await db.query('INSERT INTO departments (departmentName) VALUES (?)', [departmentName]);
    res.status(201).json({ id: result.insertId, departmentName });
  } catch (err) {
    next(err);
  }
};

// 3. UPDATE DEPARTMENT
exports.updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;
    if (!departmentName) {
      return res.status(400).json({ message: 'Department name is required' });
    }
    const [result] = await db.query('UPDATE departments SET departmentName = ? WHERE id = ?', [departmentName, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ id, departmentName });
  } catch (err) {
    next(err);
  }
};

// 4. DELETE DEPARTMENT
exports.deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [employees] = await db.query('SELECT id FROM employees WHERE departmentId = ?', [id]);
    if (employees.length > 0) {
      return res.status(400).json({ message: 'Cannot delete department. Employees are assigned to it.' });
    }
    const [result] = await db.query('DELETE FROM departments WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (err) {
    next(err);
  }
};