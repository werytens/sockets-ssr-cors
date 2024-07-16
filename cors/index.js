const express = require("express");
const cors = require("cors");

const app = express();

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/test", (req, res) => {
  res.send("123");
});

app.listen(4000, () => {
  console.log(1);
});
