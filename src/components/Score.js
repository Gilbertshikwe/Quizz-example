import React from 'react';

function Score({ score, questions }) {
  if (!questions || questions.length === 0) {
    return <p>No questions available.</p>;
  }

  const answeredQuestions = questions.filter(question => question.userAnswer !== null);
  const correctAnswers = answeredQuestions.filter(question => question.correctAnswer === question.userAnswer);
  const incorrectAnswers = answeredQuestions.filter(question => question.correctAnswer !== question.userAnswer);

  const totalQuestions = questions.length;

  let message = '';
if (score >= 5) {
  message = 'Na Umeiva Msee.Good job!';
} else if (score > 3) {
  message = 'Rudi Uive Tena Msee.Nice effort!';
} else {
  message = 'Ni Kama Hukuelewa Msee.You need to improve.';
}

  return (
    <div className="score-container">
      <div className="score-title">Your Score: {score}</div>
      <div className="score-message">{message}</div>

      {correctAnswers?.length > 0 && (
        <div className="correct-answers">
          <h3>Correct Answers:</h3>
          <p>{correctAnswers.length} out of {totalQuestions}</p>
          <ul>
            {correctAnswers.map((question) => (
              <li key={question.id}>{question.text}</li>
            ))}
          </ul>
        </div>
      )}

      {incorrectAnswers?.length > 0 && (
        <div className="incorrect-answers">
          <h3>Incorrect Answers:</h3>
          <p>{incorrectAnswers.length} out of {totalQuestions}</p>
          <ol>
            {incorrectAnswers.map((question) => (
              <li key={question.id}>
                {question.text} - Correct Answer: {question.correctAnswer}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default Score;

