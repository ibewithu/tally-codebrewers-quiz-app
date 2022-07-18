const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Quiz',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
