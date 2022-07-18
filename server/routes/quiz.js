const router = require("express").Router();
const Quiz = require("../models/Quiz");

//create quiz
router.post("/", async (req, res) => {
  const newQuiz = new Quiz({
    title: req.body.title,
    userId: req.body.userId,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  })
  try {
    const savedQuiz = await newQuiz.save()
    res.status(200).json(savedQuiz)
  } catch (err) {
    res.status(500).json(err);
  }
});

//get quizzes by id
router.get("/:id", async (req, res) => {
  await Quiz.find({userId: req.params.id}, {userId: 0}, {new: true}).then(x=>{
    res.status(200).json(x)
  }).catch((err)=>{
    res.status(500).json(err);
  })
})

module.exports = router;
