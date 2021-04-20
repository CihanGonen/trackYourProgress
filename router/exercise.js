const express = require("express");
const path = require("path");
const router = express.Router();

const Exercise = require("../models/Exercise");

router.post("/postExercise", async (req, res) => {
  const author = req.body.author;
  const exerciseName = req.body.exerciseName;
  const exerciseType = req.body.exerciseType;
  const improvement = req.body.improvement;
  const time = req.body.time;
  const exercise = new Exercise({
    author,
    exerciseName,
    exerciseType,
    improvement,
    time,
  });
  await exercise
    .save()
    .then((result) => console.log(result)) //burda paylaşıldı mesajı yer alacak
    .catch((err) => console.log(err));
});

router.get("/getAll", (req, res) => {
  Exercise.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/update", async (req, res) => {
  const id = req.body.id;
  const newImp = req.body.newImp;
  const newTime = req.body.newTime;
  try {
    await Exercise.findById(id, (err, exToUpdate) => {
      exToUpdate.improvement = newImp;
      exToUpdate.time = newTime;
      exToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Exercise.findByIdAndRemove(id).exec();
});

router.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "client", "public", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

module.exports = router;
