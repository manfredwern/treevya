/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Difficulty from './Difficulty';
import Categories from './Categories';

const quizUrl = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';

const difficulty = [
  {
    key: 'Easy',
    value: 'easy',
  },
  {
    key: 'Medium',
    value: 'medium',
  },
  {
    key: 'Hard',
    value: 'hard',
  },
];

// Fetch for Categories
const fetchCategories = async () => {
  const res = await fetch('https://opentdb.com/api_category.php');
  const data = await res.json();
  return data.trivia_categories.map(
    (cats) => (cats = { ...cats, name: cats.name.replace(/Entertainment:|Science:/, '').trim() })
  );
};

const fetchQuiz = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

const shuffleArray = (arr) => {
  arr.sort(() => Math.random() - 0.5);
};

const Welcome = ({ location }) => {
  const { state } = location;
  const player = state;
  console.log('STATE: ', player);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: 'General Knowledge', id: 9 });
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  const history = useHistory();
  const handleClick = async () => {
    const u = `${quizUrl}&category=${category.id}&difficulty=${selectedDifficulty}`;
    const q = await fetchQuiz(u).then((res) => {
      const sortedResponse = res.map((resQuestion) => {
        const choices = [...resQuestion.incorrect_answers, resQuestion.correct_answer];
        shuffleArray(choices);
        const fChoices = choices.map((c) => (c = decodeURIComponent(c)));
        return (resQuestion = {
          ...resQuestion,
          correct_answer: decodeURIComponent(resQuestion.correct_answer),
          question: decodeURIComponent(resQuestion.question),
          choices: fChoices,
        });
      });

      console.log('FIXED', category);
      console.log('FIXED', sortedResponse);
      return sortedResponse;
    });

    history.push({
      pathname: '/play',
      state: {
        category: category.name,
        questions: q,
        player,
      },
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoriesFromServer = await fetchCategories();
      setCategories(categoriesFromServer);
    };
    getCategories();
  }, []);

  const onCategoryClick = (event) => {
    console.log('SELECT', event.target.selectedOptions[0].id);
    setCategory({ name: event.target.value, id: event.target.selectedOptions[0].id });
  };

  const handleDifficultyChange = (event) => {
    console.log('DIFFICULTY', event.target.selectedOptions[0].id);
    setSelectedDifficulty(event.target.selectedOptions[0].id);
  };

  return (
    <div
      className="on-mobile is-flex is-flex-direction-column	is-flex-wrap-wrap	is-justify-content-space-between p-5"
      style={{
        height: '100vh',
      }}
    >
      <div className="">
        <p className="mb-2">Hi, {player}!</p>
      </div>

      <div>
        <p className="is-size-4	has-text-centered	has-text-weight-bold mb-6">
          Choose a category and difficulty
        </p>
        <div className="mb-6">
          <Categories allCategories={categories} onCategoryClick={onCategoryClick} />
        </div>
        <div className="mb-6">
          <Difficulty difficulty={difficulty} handleDifficulty={handleDifficultyChange} />
        </div>
      </div>
      <div>
        <button
          className="button is-large is-fullwidth has-background-success-dark	has-text-primary-light"
          type="button"
          onClick={handleClick}
          disabled={!selectedDifficulty}
        >
          Play
        </button>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default Welcome;
