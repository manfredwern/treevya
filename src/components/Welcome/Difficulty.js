import React, { useContext } from 'react';
import Level from '../../data/level';
import QuizContext from '../../QuizContext';

const Difficulty = () => {
  const { setLevel } = useContext(QuizContext);

  const handleChange = (event) => {
    const level = event.target.value.toString().toLowerCase();
    setLevel(level);
  };

  return (
    <div className="select is-large is-fullwidth">
      <select onChange={handleChange} defaultValue={'Select Level'}>
        {Level.map((d) => (
          <option key={d.value} id={d.value} disabled={d.disabled}>
            {d.key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Difficulty;
