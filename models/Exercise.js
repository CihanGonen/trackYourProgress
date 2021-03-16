const ExerciseMethods = require("../repositories/exerciseRepositories");

class Exercise {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
    this.time = Date.now();
  }

  saveExercise = ExerciseMethods.saveExercise;
  static getAll = ExerciseMethods.getAll;
}

module.exports = Exercise;
