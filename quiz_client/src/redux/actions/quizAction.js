import * as types from '../constant';
import axios from '../../config/axios';

const getQuiz = () => (dispatch) => {
  axios
    .get('/quiz')
    .then((res) => {
      dispatch({ type: types.GET_QUIZ, payload: res.data });
    })
    .catch((err) => console.log(err));
};
const createQuiz = (data) => (dispatch) => {
  axios
    .post('/quiz', data)
    .then((res) => {
      dispatch({ type: types.QUIZ_DATA, payload: res.data });
    })
    .catch((err) => console.log(err));
};
const addQuestions = (data) => (dispatch) => {
  console.log(data, 'action');
  axios
    .post('/questions', data)
    .then((res) => {
      // dispatch({ type: types.QUIZ_DATA, payload: res.data });
    })
    .catch((err) => console.log(err));
};

const getSelectedQuiz = (id) => (dispatch) => {
  console.log(id, 'action');
  axios
    .get(`/question/${id}`)
    .then((res) => {
      dispatch({ type: types.GET_SELECTED_QUIZ, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export { getQuiz, getSelectedQuiz, createQuiz, addQuestions };
