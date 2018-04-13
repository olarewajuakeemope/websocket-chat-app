
import axios from 'axios';
import processLogin from '../utils/processLogin';
import handleErrors from '../utils/handleErrors';

const doc = document;

export const loginAction = (userData) => {
  axios.post('http://localhost:8000/auth', userData)
    .then((response) => {
      processLogin(response.data.token);
    })
    .catch((err) => {
      const status = JSON.parse(err.request.response);
      handleErrors(status.message);
    });
};

const Login = () => {
  const submitButton = doc.getElementById('submit');
  submitButton.onclick = () => {
    const form = doc.getElementById('auth-form');
    const inputs = form.children;
    handleErrors('');

    // check both fields are entered
    if (inputs[0].value === '' || inputs[2].value === '') {
      return handleErrors('Enter both input fields');
    }
    const userData = {
      identifier: inputs[0].value,
      password: inputs[2].value,
    };
    loginAction(userData);
  };
};
export default Login;
