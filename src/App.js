import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Question from './components/Question';
import Score from './components/Score';
import Feedback from './components/Feedback';
import About from './components/About';
import { useFormik } from 'formik';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const formik = useFormik({
    initialValues: {
      answers: {},
    },
    onSubmit: () => {
      // Calculate the score based on selected answers
      const newScore = Object.values(formik.values.answers).reduce(
        (acc, answer) => (answer ? acc + 1 : acc),
        0
      );
      setScore(newScore);
    },
  });

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3000/questions/');
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  
  useEffect(() => {
    fetchQuestions();
  }, []);
  

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route
  path="/questions"
  element={
    questions?.length > 0 ? (
      <Question questions={questions} formik={formik} />
    ) : null
  }
/>

          <Route path="/score" element={<Score score={score} />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;