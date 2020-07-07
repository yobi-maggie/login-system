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
};
