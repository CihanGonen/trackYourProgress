const getDb = require("../utility/database").getdb;
const mongodb = require("mongodb");

class ExerciseMethods {
  static saveExercise() {
    const db = getDb();
    return db
      .collection("exercises")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
  static getAll() {
    const db = getDb();
    return db
      .collection("exercises")
      .find()
      .toArray()
      .then((exercises) => exercises)
      .catch((err) => console.log(err));
  }
}

module.exports = ExerciseMethods;
