import axios from '../axios';

export default {
  Login(params) {
    return axios.post('/login', params);
  },
  GetCode(params) {
    return axios.post('/getCode', params);
  },
  Logon(params) {
    return axios.post('/logon', params);
  },
  FindBack(params) {
    return axios.post('/findBack', params);
  },
  saveStorage(obj) {
    // for (const [key, value] of Object.entries(obj)) {
    //   localStorage.setItem(key, value);
    // }
    const { username, email, appkey } = obj;
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('appkey', appkey);
  },
  getAllStorage() {
    return localStorage;
  },
};
