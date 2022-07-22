import React, { useState, useContext } from 'react';
import QuizContext from '../../QuizContext';

const Questions = () => {
  const { gamePlay } = useContext(QuizContext);
  console.log('GAMESPLSAZ', gamePlay);

  const state = gamePlay;
  const questionList = state.questions || [];
  const category = state.category || '';
  const player = state.player || 'player';
  // const history = useHistory();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('');
  const [currentUserAnswer, setCurrentUserAnswer] = useState('');

  const handleAnswer = (answer) => {
    const correctAnswer = questionList[currentQuestion].correct_answer;
    setCurrentCorrectAnswer(correctAnswer);
    setCurrentUserAnswer(answer);
    if (answer === questionList[currentQuestion].correct_answer) {
      setScore((prevState) => prevState + 1);
    }
    setClicked(true);
  };
  const handleNextQuestion = () => {
    setClicked(false);
    if (currentQuestion < questionList.length - 1) {
      setCurrentQuestion((prevState) => prevState + 1);
    } else {
      setShowScore(true);
    }
  };

  const handlePlayAgain = () => {
    setShowScore(false);
    setClicked(false);
    setScore(0);
    setCurrentQuestion(0);

    // history.push({
    //   pathname: '/welcome',
    //   state: player,
    // });
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
              {score} out of {questionList.length}
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
          </div>
        </>
      ) : (
        <div>
          <div className="is-flex is-flex-direction-row-reverse	is-justify-content-space-between is-size-7 mb-4">
            <p>{category}</p>
            <p>
              {currentQuestion + 1} / {questionList.length}
            </p>
          </div>
          <div>
            <div className="title is-size-5 has-text-centered pb-4">
              {questionList[currentQuestion].question}
            </div>

            {questionList[currentQuestion].choices.map((choice, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="mb-2" key={index}>
                <button
                  type="button"
                  className={`button is-fullwidth is-medium
                  ${clicked && choice === currentCorrectAnswer ? 'is-success' : ''}`}
                  style={{
                    height: 'auto',
                    border: currentUserAnswer === choice ? '1px solid #333' : '',
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
          </div>
        </div>
      )}
      {clicked && (
        <div>
          <button
            type="button"
            className="button p-5 is-large is-fullwidth is-warning"
            onClick={handleNextQuestion}
          >
            {currentQuestion + 1 !== questionList.length ? 'Next' : 'Show score'}
          </button>
        </div>
      )}
    </div>
  ) : (
    ''
  );

  return div;
};

// Questions.propTypes = {
//   location: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
// };

// Questions.defaultProps = {
//   location: {},
// };

export default Questions;
