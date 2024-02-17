import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Question from './components/Question';
import Score from './components/Score';
import Feedback from './components/Feedback';
import About from './components/About';
import { useFormik } from 'formik';
import Footer from './components/Footer';
import './App.css';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const sampleQuestions = (questions, count) => {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.slice(0, count);
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const formik = useFormik({
    initialValues: {
      answers: {},
    },
    onSubmit: () => {
      const newScore = Object.values(formik.values.answers).reduce(
        (acc, answer) => (answer ? acc + 1 : acc),
        0
      );
      setScore(newScore);

      setCurrentQuestionIndex(0);
      formik.resetForm();
    },
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          const shuffledQuestions = shuffleArray(data);
          const selectedQuestions = sampleQuestions(shuffledQuestions, 5);
          setQuestions(selectedQuestions);
        } else {
          console.error('Invalid data format. Expected an array.');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path="/questions"
            element={
              questions?.length > 0 ? (
                <Question
                  questions={questions}
                  formik={formik}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex} // Pass setCurrentQuestionIndex as a prop
                  score={score}
                  setScore={setScore}
                />
              ) : (
                <p>No questions available.</p>
              )
            }
          />
          <Route path="/score" element={<Score score={score} questions={questions} />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/" element={<p>Welcome to the Quiz App!</p>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
