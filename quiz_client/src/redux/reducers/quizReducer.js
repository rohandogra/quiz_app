import * as types from '../constant';

const initialState = {
  quiz: [],
  quizData: {},
  selectedQuiz: {},
  loading: false,
};

const quiz = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUIZ: {
      return { ...state, quiz: action.payload };
    }
    case types.GET_SELECTED_QUIZ: {
      return { ...state, selectedQuiz: action.payload };
    }
    case types.QUIZ_DATA: {
      return { ...state, quizData: action.payload };
    }

    default:
      return { ...state };
  }
};

export default quiz;
