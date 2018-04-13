import jwt from 'jsonwebtoken';
import config from '../config/config';

const User = config.users;

// checks for authorization header in request
export default (token) => {
  let userExists = false;
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return userExists;
      } else {
        const username = decoded.username;
        for (let i = 0; i < User.length; i += 1) {
          if (User[i].username === username) {
            userExists = true;
            break;
          }
        }
      }
    });
  }
  return userExists;
};
