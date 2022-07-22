import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import QuizContext from '../QuizContext';

const Login = ({ name }) => {
  const { setUser, gamePlay } = useContext(QuizContext);

  const [player, setPlayer] = useState('');

  const handleInputChange = (event) => {
    event.preventDefault();
    const playerName = event.target.value;
    setPlayer(playerName);
  };

  const handleLogin = (e) => {
    // e.preventDefault();
    console.log(player);
    setUser(player);
  };

  const div = !gamePlay.player ? (
    <>
      <form
        className="on-mobile  is-flex is-flex-direction-column	is-flex-wrap-wrap	is-justify-content-space-between p-5"
        onSubmit={(e) => e.preventDefault()}
        style={{
          height: '100vh',
        }}
      >
        <div>
          <p className="has-text-centered">Welcome to</p>
          <h1 className="is-size-1 has-text-centered is-uppercase has-text-weight-bold">Treevya</h1>
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
          className="button is-large is-primary"
          onClick={() => handleLogin()}
          disabled={!player}
        >
          Play!
        </button>
      </form>
    </>
  ) : (
    ''
  );

  return <>{div}</>;
};

export default Login;
