const express = require("express");
const router = express.Router();

const Exercise = require("../models/Exercise");

router.post("/", (req, res) => {
  const name = req.body.name;
  const weight = req.body.weight;
  const exercise = new Exercise(name, weight);
  exercise
    .saveExercise()
    .then((result) => console.log(result)) //burda paylaşıldı mesajı yer alacak
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  Exercise.getAll()
    .then((exercises) => res.json(exercises))
    .catch((err) => console.log(err));
});

module.exports = router;
