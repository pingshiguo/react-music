import axios from 'axios';
import { BASE_URL } from '../../api/config';

axios.defaults.baseURL = BASE_URL;

axios.defaults.timeout = 5 * 1000;

axios.interceptors.request.use(config => {
  console.log('request start');
  console.log(config);
  return config;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use(res => {
  console.log('request end');
  console.log(res);
  return res;
}, err => {
  return Promise.reject(err);
});

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
}