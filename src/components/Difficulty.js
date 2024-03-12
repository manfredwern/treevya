import React, { useContext } from 'react';
import QuizContext from '../QuizContext';
import Level from '../data/level';

const Difficulty = () => {
  const { setLevel } = useContext(QuizContext);

  const handleCategoryChange = event => {
    const level = event.target.value.toString().toLowerCase();
    setLevel(level);
  };

  return (
    <div className="select is-large is-fullwidth">
      <select onChange={handleCategoryChange} defaultValue={'Select Level'}>
        {Level.map(d => (
          <option key={d.value} id={d.value} disabled={d.disabled}>
            {d.key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Difficulty;
