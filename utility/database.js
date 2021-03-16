const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const dbURI = require("../config/keys").mongoURI;

const mongoConnect = (callback) => {
  MongoClient.connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then((client) => {
      console.log("connected to mongodb");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getdb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No Database Found";
  }
};

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
