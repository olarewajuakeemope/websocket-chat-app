const displayMessenger = (isLoggedIn) => {
  document.getElementById('login-page').style.display = isLoggedIn ? 'none' : 'block';
  document.getElementById('messenger').style.display = isLoggedIn ? 'block' : 'none';
};

export default displayMessenger;
