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
    <div>
      <h2>Your Score: {score}</h2>
      <p>{message}</p>

      <div>
        <h3>Correct Answers:</h3>
        <p>{correctAnswers.length} out of {totalQuestions}</p>
        <ul>
          {correctAnswers.map((question) => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Incorrect Answers:</h3>
        <p>{incorrectAnswers.length} out of {totalQuestions}</p>
        <ul>
          {incorrectAnswers.map((question) => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Score;


