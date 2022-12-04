require('dotenv').config();
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  response.send('Hello World!');
});

app.get("/user", (request, response) => {
  response.send({ name: process.env.NAME, age: process.env.AGE });
});

module.exports = app;
