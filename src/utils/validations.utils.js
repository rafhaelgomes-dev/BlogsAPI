const validateEmail = (email) => {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (reg.test(email)) {
    return true; 
  }
    return false;
};

const validadePassword = (password) => {
  if (password.length < 6) {
    return { 
      type: 'password', 
      statusCode: 400, 
      message: '"password" length must be at least 6 characters long' };
  }

  return false;
};

const validadeDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return { 
      type: 'displayName', 
      statusCode: 400,
      message: '"displayName" length must be at least 8 characters long' };
  }

  return false;
};

module.exports = {
  validateEmail,
  validadePassword,
  validadeDisplayName,
};