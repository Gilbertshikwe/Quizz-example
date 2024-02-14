// Question.js

import React from 'react';

function Question({ questions, formik, currentQuestionIndex, onNext, onPrev, onAnswerSelected }) {
  console.log('questions:', questions);

  if (!questions || questions.length === 0) {
    // Render loading state or a message indicating that questions are being fetched
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    onNext();
    formik.resetForm();
  };

  const handlePrev = () => {
    onPrev();
    formik.resetForm();
  };

  const handleAnswerSelected = (choice) => {
    formik.handleChange({
      target: {
        name: `answers.${currentQuestion.id}`,
        value: choice,
      },
    });

    onAnswerSelected(choice); // Call the onAnswerSelected prop with the selected choice
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div key={currentQuestion.id}>
          <p>{currentQuestion.text}</p>
          {currentQuestion.choices.map((choice, index) => (
            <label key={index}>
              <input
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
        <button type="button" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button type="button" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          Next
        </button>
        
      </form>
    </div>
  );
}

export default Question;


