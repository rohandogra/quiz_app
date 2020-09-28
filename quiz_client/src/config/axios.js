import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://quiz-app-rohan.herokuapp.com/api',
});

export default axios;
