import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Start from './components/Start';
import { fetchDataFromApi } from './services/helper';
import TriviaApi from './data/opentrivia';
import { QuizProvider } from './QuizContext';
import Questions from './components/Questions';

function App() {
  /**
   * Get TOKEN from API
   */
  useEffect(() => {
    if (!localStorage.getItem('quiz_token')) {
      fetchDataFromApi(TriviaApi.token).then((response) => {
        if (response && response.token) {
          localStorage.setItem('quiz_token', response.token);
        }
      });
    }

    return localStorage.removeItem('quiz_token');
  }, []);

  return (
    <div>
      <div className=" has-background-white-bis">
        <div className="container box is-max-desktop main-app">
          <QuizProvider>
            <Login />
            <Start />
            <Questions />
          </QuizProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
