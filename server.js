const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const route = require("./router/exercise");

app.use("/api", route);

const port = process.env.PORT || 5000;

const mongoConnect = require("./utility/database").mongoConnect;

mongoConnect(() => {
  app.listen(port, () => console.log(`server started on port ${port}`));
});
