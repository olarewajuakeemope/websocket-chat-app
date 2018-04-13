import setAuthorizationToken from './utils/setAuthorizationToken';
import processLogin from './utils/processLogin';
import displayMessenger from './utils/displayMessenger';
import App from './js/App';
import './styles/main.css';

const body = document.getElementsByTagName('body');
body[0].style.display = 'block';

if (localStorage.getItem('jwtToken')) {
  const token = localStorage.getItem('jwtToken');
  processLogin(token);
  setAuthorizationToken(token);
  displayMessenger(true);
  App(true);
} else {
  displayMessenger(false);
  App(false);
}

