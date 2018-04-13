const ls = localStorage;

export const getCurrentUser = () => (JSON.parse(ls.getItem('user')).username);

export const getUserToken = () => (ls.getItem('jwtToken'));

export const saveCurrentUser = (user) => {
  ls.setItem('user', JSON.stringify(user));
};
