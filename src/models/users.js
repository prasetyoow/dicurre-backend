const db = require('../helpers/db');

const {LIMIT_DATA} = process.env;

exports.getAllUsers = (keyword, limit=parseInt(LIMIT_DATA), offset=0, cb) => {
  db.query(`SELECT * FROM users WHERE email LIKE '%${keyword}%' ORDER BY id ASC LIMIT $1 OFFSET $2`, [limit, offset], (err, res) => {
    cb(err, res.rows);
  });
};

exports.countAllUsers = (keyword, cb) => {
  db.query(`SELECT * FROM users WHERE email LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.getUserById = (id, cb) => {
  db.query('SELECT * FROM users WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

exports.searchSortUsers = (column_name, keyword, sort_type, limit=parseInt(LIMIT_DATA), offset=0, cb)=>{
  db.query(`SELECT * FROM users WHERE ${column_name} LIKE '%${keyword}%' ORDER BY id ${sort_type} LIMIT $1 OFFSET $2`, [limit, offset], (err, res)=>{
    cb(res.rows);
  });
};


exports.createUser = (data, cb) => {
  const query = 'INSERT INTO users(email, password, username, pin) VALUES ($1, $2, $3, $4) RETURNING *';
  const value = [data.email, data.password, data.username, data.pin];
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};


exports.editUser = (data, id, cb) => {
  const query = 'UPDATE users SET email=$1, password=$2, username=$3, pin=$4 WHERE id=$5 RETURNING *';
  const value = [data.email, data.password, data.username, data.pin, id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};

exports.deleteUser = (id, cb) => {
  const query = 'DELETE FROM users WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    cb(res, res);
  });
};