import React, { useContext } from 'react';
import Categories from './Categories';
import Difficulty from './Difficulty';
import QuizContext from '../QuizContext';
import PlayGame from './PlayGame';

const GameSelect = () => {
  const { gamePlay, setUser } = useContext(QuizContext);

  const handleQuit = () => {
    setUser('');
  };

  const div =
    gamePlay.player && !gamePlay.questions.length ? (
      <div
        className="on-mobile is-flex is-flex-direction-column	is-flex-wrap-wrap	is-justify-content-space-between p-5"
        style={{
          height: '100vh',
        }}
      >
        <div className="is-flex is-flex-direction-row is-justify-content-space-between">
          <p className="mb-2">Hi, {gamePlay.player}!</p>
          <button type="button" className="button is-small is-danger" onClick={handleQuit}>
            Exit game
          </button>
        </div>

        <div>
          <p className="is-size-4	has-text-centered	has-text-weight-bold mb-6">
            Choose a category and difficulty
          </p>
          <div className="mb-6">
            <Categories />
          </div>
          <div className="mb-6">
            <Difficulty />
          </div>
        </div>
        <PlayGame />
      </div>
    ) : (
      ''
    );

  return div;
};

export default GameSelect;
