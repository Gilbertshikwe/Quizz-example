import React from 'react';
import { useFormik } from 'formik';

function Feedback() {
  const formik = useFormik({
    initialValues: {
      feedback: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(' http://localhost:3000/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log('Feedback submitted successfully!');
          // You can add any additional logic or redirect the user to a thank you page.
        } else {
          console.error('Failed to submit feedback.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    },
  });

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Feedback:
          <textarea
            name="feedback"
            value={formik.values.feedback}
            onChange={formik.handleChange}
          />
        </label>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
