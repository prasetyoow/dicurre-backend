const db = require('../helpers/db');

exports.getAllTransactions = (cb) => {
  db.query('SELECT * FROM transaction', (err, res) => {
    cb(res.rows);
  });
};

exports.createTransactions = (data, cb) => {
  const query = 'INSERT INTO transaction (amount, receiver_id, sender_id, notes, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.amount, data.receiver_id, data.sender_id, data.notes, data.time, data.type_id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};

exports.editTransactions = (data, id, cb) => {
  const query = 'UPDATE transaction SET amount=$1, receiver_id=$2, sender_id=$3, notes=$4 time=$5 type_id=$6 WHERE id=$7 RETURNING *';
  const value = [data.amount, data.receiver_id, data.sender_id, data.notes, data.time, data.type_id, id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};

exports.deleteTransactions = (id, cb) => {
  const query = 'DELETE FROM transaction WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    cb(res, res);
  });
};