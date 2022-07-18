const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    checkBoxStates: {
      type: Array,
      required: true
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
