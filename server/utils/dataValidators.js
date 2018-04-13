import isEmpty from 'lodash/isEmpty';

/**
 * Validates post datas
 * @class dataValidators
 */
class DataValidators {

  /**
   * Validates the user inputs when trying
   * to log into the application
   * @method validateLogin
   * @param {object} data
   * @return {object} - errors
   * @return {boolean} - isValid
   * @memberOf DataValidators
   */
  validateLogin(data) {
    this.errors = {};
    if (data.identifier === undefined ||
        isEmpty((data.identifier).toString())) {
      this.errors.identifier = 'Username or email is required';
    }
    if (data.password === undefined || isEmpty((data.password).toString())) {
      this.errors.password = 'Password cannot be empty';
    }
    const errors = this.errors;
    return {
      errors,
      isValid: isEmpty(errors),
    };
  }

}


export default new DataValidators();
