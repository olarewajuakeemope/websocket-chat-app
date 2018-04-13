import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config/config';
import dataValidators from '../utils/dataValidators';

const User = config.users;

const router = express.Router();

router.post('/', (req, res) => {
  // validates request body
  const { errors, isValid } = dataValidators.validateLogin(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }
  // checks the database for the user's username
  let currUser;
  for (let i = 0; i < User.length; i += 1) {
    if (User[i].username === req.body.identifier) {
      currUser = User[i];
      break;
    }
  }

  if (!currUser) {
    return res.status(400).send({
      status: 400,
      message: 'User does not exist',
    });
  } else {
    // validates the user's password if user is found
    if (req.body.password === currUser.password) {
      const token = jwt.sign({
        username: currUser.username,
      }, config.jwtSecret);

      // returns token after successfull verification
      res.status(200).send({
        status: 200,
        message: 'Authentication successful!',
        token,
      });
    } else {
      // returns error on invalid login
      res.status(400).send({
        status: 400,
        message: 'Invalid password',
      });
    }
  }
});

export default router;
