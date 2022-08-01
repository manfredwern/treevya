import { createContext, useEffect, useState } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const initialValue = {
    player: '',
    category: { name: 'Select Category', id: 0 },
    score: '',
    level: '',
    questions: [],
    newGame: true,
  };

  const [gamePlay, setGamePlay] = useState(initialValue);

  const setCategory = (category) => {
    setGamePlay((prevState) => ({ ...prevState, category }));
  };

  const setLevel = (level) => {
    setGamePlay((prevState) => ({ ...prevState, level }));
  };

  const setUser = (player) => {
    setGamePlay((prevState) => ({ ...prevState, player }));
  };

  const setQuestions = (questions) => {
    setGamePlay((prevState) => ({ ...prevState, questions }));
  };

  const setNewGame = () => {
    setGamePlay((prevState) => ({ ...prevState, newGame: !prevState.newGame }));
  };

  return (
    <QuizContext.Provider
      value={{ gamePlay, setUser, setCategory, setLevel, setQuestions, setNewGame }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizContext;
