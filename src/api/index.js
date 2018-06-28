import axios from '../common/js/axios';
import { PARAMS } from './config';

export function get (url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function post (url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getRecommend () {
  let url = '/recommend';

  return get(url, PARAMS);
}

export function getRank () {
  let url = '/rank';

  return get(url, PARAMS);
}

export function getKeyword () {
  let url = '/keyword';

  return get(url, PARAMS);
}