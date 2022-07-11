const db = require('../helpers/db');


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
              cb(err);
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