import React, { useEffect } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import GameSelect from './components/GameSelect';
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
        if (response?.token) {
          localStorage.setItem('quiz_token', response.token);
        }
      });
    }

    return localStorage.removeItem('quiz_token');
  }, []);

  return (
    <div className="container box is-max-desktop main-app app-background">
      <QuizProvider>
        <Welcome />
        <GameSelect />
        <Questions />
      </QuizProvider>
    </div>
  );
}

export default App;
