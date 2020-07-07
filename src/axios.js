import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3333/passport',
//   baseURL: 'https://mallapi.duyiedu.com/',
});
// http response 拦截器
instance.interceptors.response.use(
  (response) => {
    // 拦截响应，做统一处理
    if (response.status !== 200) {
      return response.statusText;
    }
    if (response.data.status !== 'success') {
      return Promise.reject(response.data.msg);
    }
    return response.data.data;
  },
  // 接口错误状态处理，也就是说无响应时的处理
  (error) => Promise.reject(error), // 返回接口返回的错误信息
);
export default instance;
