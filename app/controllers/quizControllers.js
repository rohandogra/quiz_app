const Quiz = require('../models/quiz');

module.exports.create = (req, res) => {
  const body = req.body;
  const quiz = new Quiz(body);

  quiz
    .save()
    .then((quiz) => res.status(201).send(quiz))
    .catch((err) => res.status(500).send(err));
};

module.exports.list = (req, res) => {
  Quiz.find()
    // .populate('questions')
    .then((quiz) => res.status(200).send(quiz))
    .catch((err) => res.status(500).send(err));
};

module.exports.list_by_id = (req, res) => {
  const id = req.params.id;
  Quiz.findById(id)
    .populate('questions')
    .then((quiz) => res.status(200).send(quiz))
    .catch((err) => res.status(500).send(err));
};

module.exports.remove = (req, res) => {
  const id = req.params.id;
  Quiz.findByIdAndDelete(id)
    .then((_) => {
      res.status(200).send('Record Deleted Successfully.');
    })
    .catch((err) => res.status(500).send(err));
};
