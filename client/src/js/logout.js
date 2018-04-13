import { saveCurrentUser } from '../utils/userUtils';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import displayMessenger from '../utils/displayMessenger';

export const handleLogout = () => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  saveCurrentUser({});
};

const logoutAction = () => {
  handleLogout();
  displayMessenger(false);
};

const Logout = () => {
  const logoutButton = document.getElementById('logout');
  logoutButton.onclick = logoutAction;
};

export default Logout;
