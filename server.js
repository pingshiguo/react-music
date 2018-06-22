var express = require('express');
var axios = require('axios');

var app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

var apiRoutes = express.Router();

apiRoutes.get('/getRecommend', (req, res) => {
  var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  axios.get(url, {
    headers: {
      host: 'm.y.qq.com',
      origin: 'https://m.y.qq.com',
      referrer: 'https://m.y.qq.com/'
    },
    params: req.query
  }).then(response => {
    res.json(response.data);
  });
});

app.use('/api', apiRoutes);

app.listen(8000);

console.log('server start.');