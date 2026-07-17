const db = require('../config/db');

// 1. GET ALL EMPLOYEES (With Search, Pagination, & Filters)
exports.getEmployees = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, search, departmentId, status } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    let query = `
      SELECT e.*, d.departmentName 
      FROM employees e 
      LEFT JOIN departments d ON e.departmentId = d.id 
      WHERE 1=1
    `;
    let countQuery = `SELECT COUNT(*) as total FROM employees e WHERE 1=1`;
    let params = [];
    let countParams = [];

    if (search) {
      const searchWildcard = `%${search}%`;
      const filterSql = ` AND (e.fullName LIKE ? OR e.employeeCode LIKE ? OR e.email LIKE ?)`;
      query += filterSql;
      countQuery += filterSql;
      params.push(searchWildcard, searchWildcard, searchWildcard);
      countParams.push(searchWildcard, searchWildcard, searchWildcard);
    }

    if (departmentId) {
      query += ` AND e.departmentId = ?`;
      countQuery += ` AND e.departmentId = ?`;
      params.push(departmentId);
      countParams.push(departmentId);
    }

    if (status) {
      query += ` AND e.status = ?`;
      countQuery += ` AND e.status = ?`;
      params.push(status);
      countParams.push(status);
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [[{ total }]] = await db.query(countQuery, countParams);
    const [employees] = await db.query(query, params);

    res.status(200).json({
      data: employees,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

// 2. GET EMPLOYEE BY ID (This fixes your current crash!)
exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT e.*, d.departmentName 
      FROM employees e 
      LEFT JOIN departments d ON e.departmentId = d.id 
      WHERE e.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// 3. CREATE EMPLOYEE
exports.createEmployee = async (req, res, next) => {
  try {
    const { employeeCode, fullName, email, mobile, departmentId, designation, salary } = req.body;
    
    const query = `
      INSERT INTO employees (employeeCode, fullName, email, mobile, departmentId, designation, salary) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [employeeCode, fullName, email, mobile, departmentId, designation, salary]);
    
    res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
  } catch (err) {
    next(err);
  }
};

// 4. UPDATE EMPLOYEE
exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { employeeCode, fullName, email, mobile, departmentId, designation, salary } = req.body;

    const query = `
      UPDATE employees 
      SET employeeCode = ?, fullName = ?, email = ?, mobile = ?, departmentId = ?, designation = ?, salary = ? 
      WHERE id = ?
    `;
    const [result] = await db.query(query, [employeeCode, fullName, email, mobile, departmentId, designation, salary, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (err) {
    next(err);
  }
};

// 5. DELETE EMPLOYEE
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// 6. PATCH EMPLOYEE STATUS (Active/Inactive)
exports.updateEmployeeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: "Status must be either 'Active' or 'Inactive'" });
    }

    const [result] = await db.query('UPDATE employees SET status = ? WHERE id = ?', [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: `Employee status updated to ${status}` });
  } catch (err) {
    next(err);
  }
};