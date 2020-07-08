const emailReg = /^(.+)@(.+)\.com$/g;
const usernameReg = /^.{2,18}$/g;
const passwordReg = /^.{6,18}$/g;

let password = '';
module.exports.validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the username'));
  } else if (!usernameReg.test(value)) {
    callback(new Error('用户名长度应为6-18位非汉字'));
  } else {
    callback();
  }
};
module.exports.validatePass = (rule, value, callback) => {
  password = value;
  if (value === '') {
    callback(new Error('Please input the password'));
  } else if (!passwordReg.test(value)) {
    callback(new Error('密码长度应为6-18位'));
  } else {
    callback();
  }
};
module.exports.validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

module.exports.validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the email'));
  } else if (!emailReg.test(value)) {
    callback(new Error('邮箱格式不正确'));
  } else {
    callback();
  }
};
