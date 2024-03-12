import React, { useState, useContext } from 'react';
import QuizContext from '../QuizContext';

const Welcome = () => {
  const { setUser, gamePlay } = useContext(QuizContext);

  const [player, setPlayer] = useState('');

  const handleInputChange = (event) => {
    event.preventDefault();
    const playerName = event.target.value;
    setPlayer(playerName);
  };

  const handleLogin = (e) => {
    setUser(player);
  };

  const div = !gamePlay.player ? (
    <form
      className="on-mobile  is-flex is-flex-direction-column	is-flex-wrap-wrap	is-justify-content-space-between p-5"
      onSubmit={(e) => e.preventDefault()}
      style={{
        height: '100vh',
      }}
    >
      <div>
        <p className="has-text-centered">Welcome to</p>
        <h1 className="has-text-centered is-uppercase has-text-weight-bold game-title">Treevya</h1>
      </div>
      <div className="field">
        <label htmlFor="player" className="label">
          Player&apos;s Name
        </label>
        <div className="control">
          <input
            className="input is-large"
            type="text"
            placeholder="Enter your name"
            name="player"
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button
        type="button"
        className="button p-6 is-size-2 is-large is-primary"
        onClick={() => handleLogin()}
        disabled={!player}
      >
        Play!
      </button>
    </form>
  ) : (
    ''
  );

  return <>{div}</>;
};

export default Welcome;
