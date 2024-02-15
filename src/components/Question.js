import React from 'react';

function Question({ questions, setQuestions, formik, currentQuestionIndex, onNext, onPrev, onAnswerSelected }) {
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
    const isCorrect = currentQuestion.correctAnswer === choice;
  
    // Update the user's answer in the questions state
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestionIndex] = {
        ...updatedQuestions[currentQuestionIndex],
        userAnswer: choice,
        isCorrect: isCorrect,
      };
      return updatedQuestions;
    });
  
    onAnswerSelected(choice, isCorrect); // Call the onAnswerSelected prop with the selected choice and correctness
  };
  

  const isAnswerCorrect = (choice) => {
    return currentQuestion.correctAnswer === choice;
  };

  return (
    <div className="question-container">
    <form onSubmit={formik.handleSubmit}>
      <div key={currentQuestion.id}>
      <div className="question-text">{currentQuestion.text}</div>
        <div className="choices-container">
        {currentQuestion.choices.map((choice, index) => (
          <label key={index}  className={isAnswerCorrect(choice) ? 'correct' : 'incorrect'}>
            <div className="choice-label">
            <input
              type="radio"
              name={`answers.${currentQuestion.id}`}
              value={choice}
              onChange={() => handleAnswerSelected(choice)}
              checked={formik.values.answers[currentQuestion.id] === choice}
              disabled={formik.values.answers[currentQuestion.id] !== undefined} // Disable if already answered
            />
            </div>
            {choice}
          </label>
        ))}
        </div>
        {currentQuestion.isCorrect !== undefined && (
          <p className={currentQuestion.isCorrect ? 'correct-answer' : 'incorrect-answer'}>
            {currentQuestion.isCorrect ? 'Correct!' : 'Incorrect!'} The correct answer is: {currentQuestion.correctAnswer}
          </p>
        )}
      </div>
      <div className="navigation-buttons">
      <button type="button" onClick={handlePrev} className="prev-button" disabled={currentQuestionIndex === 0}>
        Previous
      </button>
      <button type="button" onClick={handleNext}  className="next-button" disabled={currentQuestionIndex === questions.length - 1}>
        Next
      </button>
      </div>
    </form>
    </div>
  );
}

export default Question;

