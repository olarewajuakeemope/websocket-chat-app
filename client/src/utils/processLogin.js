import jwt from 'jsonwebtoken';
import setAuthorizationToken from './setAuthorizationToken';
import { saveCurrentUser } from './userUtils';
import displayMessenger from './displayMessenger';
import Messenger from '../js/messenger';

const processLogin = (token) => {
  localStorage.setItem('jwtToken', token);
  setAuthorizationToken(token);
  saveCurrentUser(jwt.decode(token));
  displayMessenger(true);
  Messenger(document, window);
};

export default processLogin;
