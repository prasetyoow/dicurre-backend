const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

exports.register = (data, cb) => {
  db.query('BEGIN', err => {
    if (err) {
      cb(err);
    }else {
      const queryText = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id';
      db.query(queryText, [data.username, data.email, data.password], (err, res) => {
        if (err) {
          cb(err);
        } else {
          const queryProfile = 'INSERT INTO profile(user_id) VALUES ($1)';
          const valueProfile = [res.rows[0].id];
          db.query(queryProfile, valueProfile, (err, res) => {
            if (err) {
              cb(err, res.rows);
            } else {
              cb(err, res);
              db.query('COMMIT', err => {
                if (err) {
                  console.error('Error committing transaction', err.stack);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.transfer = (sender_id, data, cb) => {
  db.query('BEGIN', err => {
    if (err){
      cb(err);
    } else {
      const q = 'INSERT INTO transaction(amount, receiver_id, sender_id, notes, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, amount, receiver_id, sender_id, notes, time, type_id';
      const val =[parseInt(data.amount), data.receiver_id, sender_id, data.notes, data.time, data.type_id];
      db.query(q, val, (err, results) => {
        if (err){
          cb(err);
        } else {
          const editSenderProfile = 'UPDATE profile SET balance = balance - $1 WHERE user_id = $2';
          const valueSenderProfile = [parseInt(data.amount), results.rows[0].sender_id];
          db.query(editSenderProfile, valueSenderProfile, (err) => {
            if (err){
              cb(err);
            } else {
              const editReceiverProfile = 'UPDATE profile SET balance = balance + $1 WHERE user_id = $2';
              const valueSenderProfile = [parseInt(data.amount), data.receiver_id];
              db.query(editReceiverProfile, valueSenderProfile, (err, results)=>{
                if (err){
                  cb(err);
                }else {
                  cb(err, results);
                  db.query('COMMIT', err => {
                    if (err) {
                      console.error('Error transfer', err.stack);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.topUp = (receiver_id, amount, data, type_id, cb)=> {
  db.query('BEGIN', err => {
    if (err){
      cb(err);
    } else {
      const q = 'INSERT INTO transaction(amount, receiver_id, notes, time, type_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, amount, receiver_id, notes, time, type_id';
      const val =[amount, receiver_id, data.notes, data.time, type_id];
      db.query(q, val, (err, results) => {
        if (err){
          cb(err);
        } else {
          const editSenderProfile = 'UPDATE profile SET balance = balance + $1 WHERE user_id = $2';
          const valueSenderProfile = [amount, results.rows[0].receiver_id];
          db.query(editSenderProfile, valueSenderProfile, (err) => {
            if (err){
              cb(err);
            }else {
              cb(err, results);
              db.query('COMMIT', err => {
                if (err) {
                  console.error('Error transfer', err.stack);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.addPhone = (user_id, data, cb) => {
  const query = 'UPDATE profile SET phone_number=$1 WHERE user_id=$2';
  const value = [data.phone_number, user_id];
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};

exports.historyTransactions = (id, searchBy, keyword, orderBy, sortType, limit = parseInt(LIMIT_DATA), offset = 0, cb)=>{
  const q = `SELECT * FROM transaction WHERE receiver_id=${id} OR sender_id=${id} AND ${searchBy} LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortType} LIMIT $1 OFFSET $2`;
  const val = [limit, offset];
  db.query(q, val, (err, res)=>{
    if (res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.countAllHistoryTransactions = (id, cb)=>{
  db.query(`SELECT * FROM transaction WHERE receiver_id=${id} OR sender_id=${id}`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.getHistoryFix=(id, orderBy, sortType, limit, offset = 0, cb)=>{
  db.query(`SELECT transaction.id, transaction.amount, transaction.notes, transaction.time, transaction_type.name tipe_transaksi, penerima.fullname penerima_fullname, penerima.phone_number penerima_phone, penerima.picture penerima_photo, penerima.user_id penerima_id, pengirim.fullname pengirim_fullname, pengirim.phone_number pengirim_phone, pengirim.picture pengirim_photo, pengirim.user_id pengirim_id FROM transaction FULL OUTER JOIN transaction_type ON transaction_type.id = transaction.type_id FULL OUTER JOIN profile penerima ON penerima.user_id = transaction.receiver_id FULL OUTER JOIN profile pengirim ON pengirim.user_id = transaction.sender_id WHERE transaction.receiver_id = ${id} OR transaction.sender_id = ${id} ORDER BY ${orderBy} ${sortType} limit ${limit} offset ${offset}`, (err, res) => {
    cb(err, res.rows);
  });
};

exports.getTransactionsById = (id, cb) => {
  const q = 'SELECT * FROM transaction WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};