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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      // Check if the fetched data is an array
      if (Array.isArray(data)) {
        setQuestions(data);
      } else {
        console.error('Invalid data format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = formik.values.answers[currentQuestion.id];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  
    // Update the score based on correctness
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
  
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  
  const handleAnswerSelected = (choice) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = choice === currentQuestion.correctAnswer;
  
    // Update the score based on correctness
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
  
    formik.handleChange({
      target: {
        name: `answers.${currentQuestion.id}`,
        value: choice,
      },
    });
  };
  

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    console.log('Updated Questions:', questions);
    console.log('Updated Formik Values:', formik.values);
  }, [questions, formik.values]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route
          path="/questions"
          element={
            questions?.length > 0 ? (
              <Question
                questions={questions}
                formik={formik}
                currentQuestionIndex={currentQuestionIndex}
                onNext={handleNextQuestion}
                onPrev={handlePrevQuestion}
                onAnswerSelected={handleAnswerSelected} 
              />
            ) : <p>No questions available.</p>
          }
        />

          <Route path="/score" element={<Score score={score} />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          {/* Add a route for the root path if needed */}
          <Route path="/" element={<p>Welcome to the Quiz App!</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;