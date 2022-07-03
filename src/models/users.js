const db = require('../helpers/db');

exports.getAllUsers = (cb) => {
  db.query('SELECT * FROM users', (err, res) => {
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