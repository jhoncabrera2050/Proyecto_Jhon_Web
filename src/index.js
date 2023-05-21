const express = require('express');
const app = express();
const db = require('./conection');
app.use(express.json());
app.use(require('../src/routes/index'))

app.listen(3000);
console.log('server on port',3000)