require('dotenv').config();
const express = require('express');
const app = express();
let conf = require('../service/config.js');

app.get("/", (req, res) => {
     console.log(`Redirecting to ${conf.get('url')}`)
     res.redirect(conf.get('url'));
});

module.exports = app;