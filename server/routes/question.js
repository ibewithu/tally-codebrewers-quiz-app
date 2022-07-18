const router = require("express").Router();
const Question = require("../models/Question");

//save new question
router.post("/", async (req, res) => {
  const newQuestion = new Question({
    questionText: req.body.questionText, 
    options: req.body.options,
    quizId: req.body.quizId
  });
  try {
    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all questions by quiz id
router.get("/:quizId", async (req, res) => {
    try {
      const questions = await Question.find({quizId: req.params.quizId});
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
