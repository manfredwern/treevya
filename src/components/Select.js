import React from 'react';
import Categories from './Categories';
import Difficulty from './Difficulty';
import { useContext } from 'react';
import QuizContext from '../QuizContext';
import Play from './Play';

const Select = () => {
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
          <button type="button" className="button is-small is-dark" onClick={handleQuit}>
            quit
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
        <div>
          {/* {!gamePlay.questions?.length && (
            <div className="notification has-background-black	 has-text-info-light has-text-centered">
              choose another level or category{' '}
            </div>
          )} */}
          <Play></Play>
        </div>
      </div>
    ) : (
      ''
    );

  return div;
};

export default Select;
