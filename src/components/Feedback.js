import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function Feedback() {
    const [comments, setComments] = useState([]);
  
    const formik = useFormik({
      initialValues: {
        feedback: '',
      },
      onSubmit: async (values, { resetForm }) => {
        try {
          const response = await fetch('http://localhost:3000/feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feedback: values.feedback }),
          });
  
          if (response.ok) {
            console.log('Feedback submitted successfully!');
            // After submitting feedback, fetch the updated comments
            fetchComments();
            resetForm(); // Reset the form after successful submission
          } else {
            const errorData = await response.json();
            console.error('Failed to submit feedback. Server error:', errorData);
          }
        } catch (error) {
          console.error('Error submitting feedback:', error);
        }
      },
    });
  
    const fetchComments = async () => {
        try {
          const response = await fetch('http://localhost:3000/feedback');
          if (response.ok) {
            const data = await response.json();
            setComments(data || []); // Update to directly set the array
          } else {
            console.error('Failed to fetch comments.');
          }
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      
  
    useEffect(() => {
      fetchComments();
    }, []); // Fetch comments when the component mounts
  
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
  
        <h3>Comments:</h3>
        <ul>
           {comments.map((comment) => (
           <li key={comment.id}>{comment.feedback}</li>
            ))}
       </ul>

      </div>
    );
  }
  
  export default Feedback;


