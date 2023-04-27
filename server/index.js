// eslint-disable-next-line no-undef
const express  = require('express');

const app = express();

const PORT = 8888;

app.listen(PORT, () => {
  console.info('App running: http://127.0.0.1:' + PORT);
});

app.use(express.static('dist'));
