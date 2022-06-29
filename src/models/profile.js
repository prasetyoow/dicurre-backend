const db = require('../helpers/db');

exports.getAllProfile = (cb) => {
  db.query('SELECT * FROM profile', (err, res) => {
    cb(res.rows);
  });
};

exports.createProfile = (data, cb) => {
  const query = 'INSERT INTO profile(fullName, phone_number, balance, picture, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const value = [data.fullName, data.phone_number, data.balance, data.picture, data.user_id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};

exports.editProfile = (data, id, cb) => {
  const query = 'UPDATE profile SET fullName=$1, phone_number=$2, balance=$3, picture=$4 WHERE id=$5 RETURNING *';
  const value = [data.fullName, data.phone_number, data.balance, data.picture, id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};