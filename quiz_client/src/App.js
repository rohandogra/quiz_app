import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Quiz from './components/Quiz';
import QuizCreate from './components/QuizCreate';
import Navbar from './components/navBar/Navbar';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <div>
          <Switch>
            <Redirect from='/' to='/home' exact />
            <Route path='/Create' component={QuizCreate} exact />
            <Route path='/home' component={Quiz} exact />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
