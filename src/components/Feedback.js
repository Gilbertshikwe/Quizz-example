import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function Feedback() {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [allFeedback, setAllFeedback] = useState([]);

  const formik = useFormik({
    initialValues: {
      feedback: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:4000/feedback', {
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

  useEffect(() => {
    const fetchAllFeedback = async () => {
      try {
        const response = await fetch('http://localhost:4000/feedback');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAllFeedback(data);
      } catch (error) {
        console.error('Error fetching all feedback:', error);
      }
    };

    fetchAllFeedback();
  }, []);

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

      {allFeedback.length > 0 && (
  <div className='all-feedback'>
    <h3>User's Feedback:</h3>
    <ul>
      {allFeedback.map((feedbackItem) => (
        <li key={feedbackItem.id}>{feedbackItem.feedback}</li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
}

export default Feedback;

