const db = require('../config/db');

exports.getProductosFiltrados = (req, res) => {
    let sql = 'SELECT * FROM productos WHERE 1';
    const { precio_min, categoria } = req.query;
    if (precio_min) {
      sql += ` AND precio > ${db.escape(precio_min)}`;
    }
    if (categoria) {
      sql += ` AND categoria = ${db.escape(categoria)}`;
    }
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  };

exports.getProductosOrdenados = (req, res) => {
    const { criterio } = req.query;
    let sql = 'SELECT * FROM productos';
    if (criterio === 'nombre' || criterio === 'precio' || criterio === 'cantidad') {
      sql += ` ORDER BY ${criterio}`;
    } else {
      res.status(400).json({ error: 'Criterio de ordenación inválido.' });
      return;
    }
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  };

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.createUser = (req, res) => {
  const { nombre, precio, cantidad, categoria } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?, ?, ?)', [nombre, precio, cantidad, categoria], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, nombre, precio, cantidad, categoria});
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad, categoria} = req.body;
  db.query('UPDATE users SET nombre = ?, precio = ?, cantidad = ?, categoria = ?, WHERE id = ?', [nombre, precio, cantidad, categoria, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User updated successfully!' });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User deleted successfully!' });
  });
};