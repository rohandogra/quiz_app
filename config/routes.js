const express = require('express');
const quizController = require('../app/controllers/quizControllers.js');
const questionController = require('../app/controllers/questionController');

const router = express.Router();

//* Quiz Routes
router.get('/quiz', quizController.list);
router.get('/quiz/:id', quizController.list_by_id);
router.post('/quiz', quizController.create);
router.delete('/quiz/:id', quizController.remove);

//* Questions Routes
router.get('/questions', questionController.list);
router.post('/questions', questionController.create);
router.delete('/question/:id', questionController.remove);
router.get('/question/:id', questionController.listById);

module.exports = router;
