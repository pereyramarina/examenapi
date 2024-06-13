const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', // El usuario por defecto de MySQL en XAMPP es 'root'
  password: '', // Por defecto, no hay contraseña para 'root'
  database: 'myapi_db' // El nombre de la base de datos que creaste
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

module.exports = connection;