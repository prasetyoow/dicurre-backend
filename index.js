require('dotenv').config();

const cors = require('cors');
const express = require('express');
const authMid = require('./src/middleware/auth');
const app = express();

global.__basepath = __dirname;

app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/public', express.static('assets'));
app.get('/', (req, res) => {
  return res.json({
    succes: true,
    message: 'Backend is running well'
  });
});

app.get('/authenticatedUser', authMid, (req, res) => {
  const userModel = require('./src/models/users');
  userModel.getUserById(req.authUser.id, (err, results) => {
    const user = results.rows[0];
    return res.json({
      message: 'Hello ' + user.email
    });
  });
});

app.use('/', require('./src/routes'));

app.post('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Posted data success to send'
  });
});

app.use('*', (req, res) => {
  return res.status(404).send({
    succes: false,
    message: 'Resource not found'
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});