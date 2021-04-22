/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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

const fetchToken = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.token ? data.token : '';
};

const shuffleArray = (arr) => {
  arr.sort(() => Math.random() - 0.5);
};

const Welcome = ({ location }) => {
  const { state } = location;
  const player = state;

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: 'General Knowledge', id: 9 });
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [isBankEmpty, setIsBankEmpty] = useState(false);

  const history = useHistory();
  const handleClick = async () => {
    const token = localStorage.getItem('quiz_token');
    let baseUrl = `${quizUrl}&category=${category.id}&difficulty=${selectedDifficulty}`;
    if (token) {
      baseUrl = `${baseUrl}&token=${token}`;
    }

    const questionBank = await fetchQuiz(baseUrl)
      .then((res) => {
        if (res.length) {
          setIsBankEmpty(false);
        }

        const sortedResponse = res.map((resQuestion) => {
          const choices = [...resQuestion.incorrect_answers, resQuestion.correct_answer];
          shuffleArray(choices);
          const decodedChoices = choices.map((c) => (c = decodeURIComponent(c)));
          return (resQuestion = {
            ...resQuestion,
            correct_answer: decodeURIComponent(resQuestion.correct_answer),
            question: decodeURIComponent(resQuestion.question),
            choices: decodedChoices,
          });
        });

        return sortedResponse;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log('BANK', questionBank);

    if (!questionBank || !questionBank.length) {
      setIsBankEmpty(true);
    }

    if (questionBank && questionBank.length) {
      history.push({
        pathname: '/play',
        state: {
          category: category.name,
          questions: questionBank,
          player,
        },
      });
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoriesFromServer = await fetchCategories();
      if (!localStorage.getItem('quiz_token')) {
        fetchToken('https://opentdb.com/api_token.php?command=request').then((res) => {
          if (res) {
            localStorage.setItem('quiz_token', res);
          }
        });
      }
      setCategories(categoriesFromServer);
    };
    getCategories();
  }, []);

  const onCategoryClick = (event) => {
    const id = event.target.selectedOptions[0].id || 0;
    setCategory({ name: event.target.value, id });
  };

  const handleDifficultyChange = (event) => {
    const id = event.target.selectedOptions[0].id || 0;
    setSelectedDifficulty(id);
  };

  return (
    <div
      className="on-mobile is-flex is-flex-direction-column	is-flex-wrap-wrap	is-justify-content-space-between p-5"
      style={{
        height: '100vh',
      }}
    >
      <div className="is-flex is-flex-direction-row is-justify-content-space-between">
        <p className="mb-2">Hi, {player}!</p>
        <Link to="/" className="button is-small is-dark">
          quit
        </Link>
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
        {isBankEmpty && (
          <div className="notification has-background-black	 has-text-info-light has-text-centered">
            choose another level or category{' '}
          </div>
        )}
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
