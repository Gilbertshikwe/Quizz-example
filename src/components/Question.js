import React from 'react';

function Question({ questions, formik }) {
  console.log('questions:', questions);

  if (!questions || questions.length === 0) {
    // Render loading state or a message indicating that questions are being fetched
    return <p>Loading questions...</p>;
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            {question.choices.map((choice, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`answers.${question.id}`}
                  value={choice}
                  onChange={formik.handleChange}
                  checked={formik.values.answers[question.id] === choice}
                />
                {choice}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Question;


