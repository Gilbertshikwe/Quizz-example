import React from 'react';

function Score({ score, questions }) {
  // Ensure questions is defined before filtering
  const correctAnswers = (questions || []).filter((question) => question.correctAnswer === question.userAnswer);
  const incorrectAnswers = (questions || []).filter((question) => question.correctAnswer !== question.userAnswer);

  const totalQuestions = questions ? questions.length : 0;

  let message = '';

  if (score > 15) {
    message = 'Good job!';
  } else if (score >= 10) {
    message = 'Nice effort!';
  } else {
    message = 'You need to improve.';
  }

  return (
    <div className="score-container">
      <div className="score-title">Your Score: {score}</div>
      <div className="score-message">{message}</div>

      <div className="correct-answers">
        <h3>Correct Answers:</h3>
        <p>{correctAnswers.length} out of {totalQuestions}</p>
        <ul>
          {correctAnswers.map((question) => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ul>
      </div>

      <div className="incorrect-answers">
        <h3>Incorrect Answers:</h3>
        <p>{incorrectAnswers.length} out of {totalQuestions}</p>
        <ol>
          {incorrectAnswers.map((question) => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Score;


