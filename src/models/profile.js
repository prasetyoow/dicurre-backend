const db = require('../helpers/db');

exports.getAllProfile = (cb) => {
  db.query('SELECT * FROM profile', (err, res) => {
    cb(res.rows);
  });
};

exports.getProfileById = (id, cb) => {
  const q = 'SELECT * FROM profile WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};

exports.createProfile = (data, picture, cb) => {
  const query = 'INSERT INTO profile (fullname, phone_number, balance, picture, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const value = [data.fullname, data.phone_number, data.balance, picture, data.user_id];
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};

exports.editProfile = (id, data, picture, cb) => {
  const query = 'UPDATE profile SET fullname=$1, phone_number=$2, balance=$3, picture=$4 WHERE id=$5 RETURNING *';
  const value = [data.fullname, data.phone_number, data.balance, picture, id];
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res);
    } else {
      cb(err);
    }
  });
};

exports.deleteProfile = (id, cb) => {
  const query = 'DELETE FROM profile WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};

