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

exports.trasfer = (sender_id, amount, data, cb)=> {
  db.query('BEGIN', err => {
    if (err){
      cb(err);
    } else {
      const q = 'INSERT INTO transactions(amount, receiver_id, sender_id, notes, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING amount, receiver_id, sender_id, notes, time, type_id';
      const val =[amount, data.receiver_id, sender_id, data.notes, data.time, data.type_id];
      db.query(q, val, (err, results) => {
        if (err){
          cb(err);
        } else {
          const editSenderProfile = 'UPDATE profile SET balance = balance - $1 WHERE user_id = $2';
          const valueSenderProfile = [amount, results.rows[0].sender_id];
          db.query(editSenderProfile, valueSenderProfile, (err) => {
            if (err){
              cb(err);
            } else {
              const editReceiverProfile = 'UPDATE profile SET balance = balance + $1 WHERE user_id = $2';
              const valueSenderProfile = [amount, data.receiver_id];
              db.query(editReceiverProfile, valueSenderProfile, (err, results)=>{
                if (err){
                  cb(err);
                }else {
                  cb(err, results);
                  db.query('COMMIT', err => {
                    if (err) {
                      console.error('Error trasfer', err.stack);
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

exports.transfer = (sender_id, data, cb)=> {
  db.query('BEGIN', err => {
    if (err){
      cb(err);
    } else {
      const query = 'INSERT INTO transaction(amount, receiver_id, sender_id, notes, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING amount, receiver_id, sender_id, notes, time, type_id';
      const value =[data.amount, data.receiver_id, sender_id, data.notes, data.time, data.type_id];
      db.query(query, value, (err, res1) => {
        if (err){
          cb(err);
        } else {
          const editSenderProfile = 'UPDATE profile SET balance = balance - $1 WHERE user_id = $2';
          const valueSenderProfile = [data.amount, res1.rows[0].sender_id];
          db.query(editSenderProfile, valueSenderProfile, (err) => {
            if (err) {
              cb(err);
            } else {
              const editReceiverProfile = 'UPDATE profile SET balance = balance + $1 WHERE user_id = $2';
              const valueSenderProfile = [data.amount, data.receiver_id];
              db.query(editReceiverProfile, valueSenderProfile, (err)=>{
                if (err) {
                  cb(err);
                }else {
                  cb(err, res1);
                  db.query('COMMIT', err => {
                    if (err) {
                      console.error('Error trasfer', err.stack);
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

exports.historyTransactions = (id, searchBy, keyword, orderBy, sortType, limit=parseInt(LIMIT_DATA), offset = 0, cb)=>{
  const q = `SELECT * FROM transactions WHERE recipient_id=${id} OR sender_id=${id} AND ${searchBy} LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortType} LIMIT $1 OFFSET $2`;
  const val = [limit, offset];
  db.query(q, val, (err, res)=>{
    if (res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.countHistoryTransactions = (id, searchBy, keyword, cb)=>{
  db.query(`SELECT * FROM transactions WHERE recipient_id=${id} OR sender_id=${id} AND ${searchBy} LIKE '%${keyword}%'`, (err, res)=>{
    cb(err, res.rowCount);
  });
};
