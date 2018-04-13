import Login from './login';
import Logout from './logout';
import Messenger from './messenger';

const App = (isLogedIn) => {
  Login();
  Logout();
  if (isLogedIn) Messenger(document, window);
};

export default App;
