const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  correct_answer: {
    type: String,
    required: true,
    trim: true,
  },
  incorrect_answers: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  quiz_id: {
    type: Schema.Types.ObjectId,
    ref: 'quiz',
  },
  all_answers: {
    type: Array,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
