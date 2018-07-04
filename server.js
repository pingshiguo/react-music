const express = require('express');
const axios = require('axios');

const app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

axios.defaults.headers = {
  host: 'm.y.qq.com',
  origin: 'https://m.y.qq.com',
  referrer: 'https://m.y.qq.com/'
};

const apiRoutes = express.Router();

apiRoutes.get('/recommend', (req, res) => {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  axios.get(url, {
    headers: {
      host: 'm.y.qq.com',
      origin: 'https://m.y.qq.com',
      referrer: 'https://m.y.qq.com/'
    },
    params: req.query
  })
    .then(response => {
      res.json(response.data);
    });
});

apiRoutes.get('/rank', (req, res) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

  axios.get(url, {
    headers: {
      host: 'm.y.qq.com',
      origin: 'https://m.y.qq.com',
      referrer: 'https://m.y.qq.com/'
    },
    params: req.query
  })
    .then(response => {
      res.json(response.data);
    });
});

apiRoutes.get('/rank_detail', (req, res) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';

  axios.get(url, {
    params: req.query
  })
    .then(response => {
      res.json(response.data);
    });
});

apiRoutes.get('/keyword', (req, res) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  axios.get(url, {
    headers: {
      host: 'm.y.qq.com',
      origin: 'https://m.y.qq.com',
      referrer: 'https://m.y.qq.com/'
    },
    params: req.query
  })
    .then(response => {
      res.json(response.data);
    });
});

app.use('/api', apiRoutes);

app.listen(8000);

console.log('server start.');