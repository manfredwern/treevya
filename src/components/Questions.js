import React, { useContext, useState } from 'react';
import QuizContext from '../QuizContext';

const Questions = () => {
  const { gamePlay } = useContext(QuizContext);

  const { questions: questionBank, category, player } = gamePlay;

  const [quesNumber, setQuesNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('');
  const [currentUserAnswer, setCurrentUserAnswer] = useState('');

  const handleAnswer = (answer) => {
    const correctAnswer = questionBank[quesNumber].correct_answer;
    setCurrentCorrectAnswer(correctAnswer);
    setCurrentUserAnswer(answer);
    if (answer === questionBank[quesNumber].correct_answer) {
      setScore((prevState) => prevState + 1);
    }
    setClicked(true);
  };

  const handleNextQuestion = () => {
    setClicked(false);
    if (quesNumber < questionBank?.length - 1) {
      setQuesNumber((prevState) => prevState + 1);
    } else {
      setShowScore(true);
    }
  };

  const handlePlayAgain = () => {
    setShowScore(false);
    setClicked(false);
    setScore(0);
    setQuesNumber(0);
  };

  const div = gamePlay.questions?.length ? (
    <div className="on-mobile is-flex is-flex-direction-column	is-flex-wrap-wrap	is-justify-content-space-between p-5">
      {showScore ? (
        <>
          <div>
            <p>Quiz completed</p>
            <p className="is-size-5">{score > 6 ? 'Contratulations' : ''}</p>
          </div>
          <div>
            <p className="title has-text-centered">{player}, your score is</p>
            <p className="title has-text-centered">
              {score} out of {questionBank.length}
            </p>
          </div>
          <div>
            <button
              type="button"
              className="button is-large is-fullwidth has-background-success-dark	has-text-primary-light"
              onClick={() => handlePlayAgain()}
            >
              Play again
            </button>
            <button
              type="button"
              className="button is-large is-fullwidth has-background-success-dark	has-text-primary-light"
              onClick={() => console.log('new game')}
            >
              New Game
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="is-flex is-flex-direction-row-reverse	is-justify-content-space-between is-size-7 mb-4">
            <p>{category.name}</p>
            <p>
              {quesNumber + 1} / {questionBank?.length}
            </p>
          </div>
          <div className="title is-size-5 has-text-centered pb-4">
            {questionBank?.length && questionBank[quesNumber].question}
          </div>
          {questionBank?.length &&
            questionBank[quesNumber].choices.map((choice, index) => (
              <div className="mb-2" key={index}>
                <button
                  type="button"
                  className={`button is-fullwidth is-medium
                  ${
                    clicked && choice === currentCorrectAnswer && currentUserAnswer !== choice
                      ? 'is-danger'
                      : clicked && choice === currentCorrectAnswer && currentUserAnswer === choice
                      ? 'is-success'
                      : ''
                  }`}
                  style={{
                    height: 'auto',
                    border: currentUserAnswer === choice ? '3px solid #333' : '',
                  }}
                  onClick={() => handleAnswer(choice)}
                  disabled={clicked}
                >
                  <p
                    style={{
                      whiteSpace: 'break-spaces',
                    }}
                  >
                    {choice}
                  </p>
                </button>
              </div>
            ))}
          {clicked && (
            <div>
              <button
                type="button"
                className="button p-5 is-large is-fullwidth is-warning"
                onClick={handleNextQuestion}
              >
                {quesNumber + 1 !== questionBank.length ? 'Next' : 'Show score'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  ) : (
    ''
  );

  return div;
};

export default Questions;
