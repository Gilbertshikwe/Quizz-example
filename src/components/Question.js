import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Question({ questions, formik, currentQuestionIndex, setCurrentQuestionIndex, score, setScore }) {
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleAnswerSelected = (choice) => {
    formik.handleChange({
      target: {
        name: `answers.${currentQuestion.id}`,
        value: choice,
      },
    });
  };

  const handleSubmitQuiz = () => {
    const allAnswered = questions.every(question => formik.values.answers[question.id]);
    if (allAnswered) {
      const newScore = questions.reduce((totalScore, question) => {
        const selectedAnswer = formik.values.answers[question.id];
        return selectedAnswer === question.correctAnswer ? totalScore + 1 : totalScore;
      }, 0);
      setScore(newScore);
      setAllQuestionsAnswered(true);
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  if (allQuestionsAnswered) {
    return <Navigate to="/score" />;
  }

  return (
    <div className='quiz-container'>
      <h2 className='question-heading'>Question {currentQuestionIndex + 1}</h2>
      <p className='question-text'>{currentQuestion.text}</p>
      <div className='choices-container'>
        {currentQuestion.choices.map((choice, index) => (
          <label className='label-container' key={index}>
            <input
              className='choice-input'
              type="radio"
              name={`answers.${currentQuestion.id}`}
              value={choice}
              onChange={() => handleAnswerSelected(choice)}
              checked={formik.values.answers[currentQuestion.id] === choice}
            />
            {choice}
          </label>
        ))}
      </div>
      <div className='action-buttons'>
        <button className='prev-button' type="button" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button className='submit-button' type="button" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        ) : (
          <button className='next-button' type="button" onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;
