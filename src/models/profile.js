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

exports.countAllProfile = (keyword, cb)=>{
  db.query(`SELECT * FROM profile WHERE fullname LIKE '%${keyword}%'`, (err, res)=>{
    cb(err, res.rowCount);
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
  let value = [id];

  const filtered = {};
  const obj = {
    picture,
    fullname: data.fullname,
    balance: data.balance,
    phone_number: data.phone_number,
  };

  for( let x in obj ) {
    if(obj[x]!==null) {
      filtered[x] = obj[x];
      value.push(obj[x]);
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind) => `${o}=$${ind+2}`);


  const query = `UPDATE profile SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res.rows);
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


exports.getProfileByUserId = (user_id, cb) => {
  const q = 'SELECT * FROM profile WHERE user_id=$1';
  const val = [user_id];
  db.query(q, val, (err, res)=>{
    cb(err, res.rows);
  });
};

exports.editProfileByUserId = (user_id, picture, data, cb)=>{
  let val = [user_id];

  const filtered = {};

  const objt = {
    picture,
    balance: data.balance,
    fullname: data.fullname,
    phone_number: data.phone_number
  };

  for(let x in objt){
    if (objt[x]!==null) {
      filtered[x] = objt[x];
      val.push(objt[x]);
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind)=> `${o}=$${ind+2}`);

  const q = `UPDATE profile SET ${finalResult} WHERE user_id=$1 RETURNING *`;
  db.query(q, val, (err, res)=>{
    cb(err, res);
  });
};

exports.changePhoneNumber = (id, data, cb) => {
  const query = 'UPDATE profile SET phone_number=$1 WHERE user_id=$2';
  const value = [data.phone_number, id];
  db.query(query, value, (err, res) => {
    cb(err, res);
  });
};