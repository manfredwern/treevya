import React, { useContext } from 'react';
import QuizContext from '../QuizContext';
import TriviaApi from '../data/opentrivia';
import { fetchDataFromApi, shuffleArray } from '../services/helper';

const Play = () => {
  const { gamePlay, setQuestions } = useContext(QuizContext);

  console.log(gamePlay);

  const handleClick = async () => {
    let questionsUrl = `${TriviaApi.url}&category=${gamePlay.category.id}&difficulty=${gamePlay.level}`;

    const questions = await fetchDataFromApi(questionsUrl, true).then((data) => {
      const sortedResponse = data.results.map((resQuestion) => {
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
    });

    setQuestions(questions);
  };

  return (
    <>
      <button
        className="button is-large is-fullwidth has-background-success-dark	has-text-primary-light"
        type="button"
        disabled={!gamePlay.level}
        onClick={handleClick}
      >
        Play
      </button>
    </>
  );
};

export default Play;