const Question = require('../models/question');
const Quiz = require('../models/quiz');

module.exports.list = (req, res) => {
  Question.find().then((question) => {
    res.status(200).send({ question, length: question.length });
  });
};
module.exports.listById = (req, res) => {
  const id = req.params.id;

  Quiz.findById(id)
    .populate('questions')
    .then((response) => {
      res.status(200).send({ question: response.questions });
    })
    .catch((err) => console.log(err));
};

module.exports.create = (req, res) => {
  const body = req.body;
  const question = new Question({
    question: body.question,
    quiz_id: body.quiz_id,
    correct_answer: body.correct_answer,
    incorrect_answers: body.incorrect_answers,
    all_answers: [...body.incorrect_answers, body.correct_answer],
  });
  question
    .save()
    .then((question) => {
      Quiz.findByIdAndUpdate(
        question.quiz_id,
        {
          $push: { questions: question._id },
        },
        { new: true }
      )
        .then((_) => res.status(201))
        .catch((err) => res.status(500).send(err));
      res.status(201).send(question);
    })
    .catch((err) => res.status(500).send(err));
};

module.exports.remove = (req, res) => {
  const id = req.params.id;
  Question.findByIdAndDelete(id)
    .then((question) => {
      if (question) {
        Quiz.findByIdAndUpdate(
          question.quiz_id,
          {
            $pull: { questions: question._id },
          },
          { new: true }
        )
          .then((_) => res.status(201))
          .catch((err) => res.status(500).send(err));
        res.status(200).send('Record Deleted Successfully.');
      } else {
        res.status(500).send('No Record Found.');
      }
    })
    .catch((err) => res.status(500).send(err));
};
