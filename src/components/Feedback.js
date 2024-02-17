import React, { useState } from 'react';
import { useFormik } from 'formik';

function Feedback() {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const formik = useFormik({
    initialValues: {
      feedback: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:4000/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setSubmissionStatus('success');
          resetForm();
        } else {
          setSubmissionStatus('error');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        setSubmissionStatus('error');
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.feedback.trim()) {
        errors.feedback = 'Feedback is required';
      }
      return errors;
    },
  });

  return (
    <div className='feedback-container'>
      <h2>Feedback Form</h2>
      {submissionStatus === 'success' && <p>Thank you for your feedback! Your feedback has been submitted successfully.</p>}
      {submissionStatus === 'error' && <p>Failed to submit feedback. Please try again later.</p>}
      <form onSubmit={formik.handleSubmit} className='feedback-form'>
        <label>
          Feedback:
          <textarea
            name="feedback"
            value={formik.values.feedback}
            onChange={formik.handleChange}
            className='feedback-textarea'
          />
          {formik.touched.feedback && formik.errors.feedback ? (
            <div style={{ color: 'red' }} className='error-message'>{formik.errors.feedback}</div>
          ) : null}
        </label>
        <button type="submit" className='submit-button' disabled={!formik.isValid}>Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
