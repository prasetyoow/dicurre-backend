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
  const q = 'SELECT * FROM users WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(err, res);
  });
};

exports.getUserByEmail = (email, cb) => {
  db.query('SELECT * FROM users WHERE email=$1', [email], (err, res) => {
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
    cb(err, res);
  });
};

exports.updateUserByEmail = (email, pin, cb) => {
  const query = 'UPDATE users SET pin = $1 WHERE email = $2 RETURNING *';
  const value = [pin, email];
  db.query(query, value, (err, res) => {
    cb(err, res);
  });
};

exports.editUser = (id, data, cb) => {

  let value = [id];

  const filtered = {};
  const obj = {
    email: data.email,
    password: data.password,
    username: data.username,
    pin: data.pin
  };

  for( let x in obj ) {
    if(obj[x]!==null) {
      filtered[x] = obj[x];
      value.push(obj[x]);
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind) => `${o}=$${ind+2}`);

  const query = `UPDATE users SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(query, value, (err, res) => {
    cb(err, res);
  });
};

exports.deleteUser = (id, cb) => {
  const query = 'DELETE FROM users WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    cb(res.rows);
  });
};

exports.changePassword = (id, data, cb)=>{
  const q = 'UPDATE users SET password=$1 WHERE id=$2';
  const val = [data.password, id];
  db.query(q, val, (err, res)=>{
    if (res) {
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.changePin = (id, data, cb)=>{
  const q = 'UPDATE users SET pin=$1 WHERE id=$2';
  const val = [data.pin, id];
  db.query(q, val, (err, res)=>{
    console.log(res);
    if (res) {
      cb(err, res);
    }else{
      cb(err);
    }
  });
};