const express = require("express");
const cors = require("cors");

const app = express();

const whitelist = ["http://localhost:3000"];

const simpleHeaders = [
  "Cache-Control",
  "Content-Language",
  "Content-Length",
  "Content-Type",
  "Expires",
  "Last-Modified",
  "Pragma",
]; // простые заголовки

const notSimpleHeaders = ["Content-Encoding", "API-key"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // авторизационные данные, в Access-Control-Allow-Origin запрещено использовать звёздочку *
  //  для запросов с авторизационными данными.
  methods: ['GET', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [...simpleHeaders, ...notSimpleHeaders], // список разрешенных заголовков
  exposedHeaders: notSimpleHeaders, // доступ к непростым заголовкам
};

app.use(cors(corsOptions));

app.get("/test", (req, res) => {
  res.send("123");
});

app.listen(4000, () => {
  console.log(1);
});
