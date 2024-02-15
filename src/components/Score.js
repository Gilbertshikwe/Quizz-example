import React from 'react';

function Score({ score, questions }) {
  // Ensure questions is defined before filtering
  const correctAnswers = (questions || []).filter((question) => question.correctAnswer === question.userAnswer);
  const incorrectAnswers = (questions || []).filter((question) => question.correctAnswer !== question.userAnswer);

  return (
    <div>
      <h2>Your Score: {score}</h2>

      <div>
        <h3>Correct Answers:</h3>
        <p>{correctAnswers.length} out of {questions ? questions.length : 0}</p>
        <ul>
          {correctAnswers.map((question) => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Incorrect Answers:</h3>
        <p>{incorrectAnswers.length} out of {questions ? questions.length : 0}</p>
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



