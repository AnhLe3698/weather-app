'use strict';
const express = require('express');
const request = require('request');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
  console.log('Weather-listening on Port 8080');
});

