const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const dbURI = require("./config/keys").mongoURI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection
mongoose.connect(process.env.MONGODB_URI || dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("./client/build"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));

const route = require("./router/exercise");

app.use("/", route);

// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client", "build"));
// });
