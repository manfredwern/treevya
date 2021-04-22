/* eslint-disable react/prop-types */
import React from 'react';

const Difficulty = ({ difficulty, handleDifficulty }) => (
  <div className="select is-large is-fullwidth">
    <select onChange={handleDifficulty}>
      {difficulty.map((d) => (
        <option key={d.value} id={d.value}>
          {d.key}
        </option>
      ))}
    </select>
  </div>
);

export default Difficulty;
