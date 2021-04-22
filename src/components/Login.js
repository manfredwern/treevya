/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [player, setPlayer] = useState('');
  const history = useHistory();
  const handlePlayer = (userInput) => {
    userInput.preventDefault();
    const playerName = userInput.target.value;

    setPlayer(playerName);
  };

  const handleLogin = (e) => {
    console.log(e);
    e.preventDefault();
    history.push({
      pathname: '/welcome',
      state: player,
    });
  };

  return (
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
              onChange={handlePlayer}
            />
          </div>
        </div>
        <button
          type="button"
          className="button is-large is-primary"
          onClick={handleLogin}
          disabled={!player}
        >
          Start
        </button>
      </form>
    </>
  );
};
export default Login;
