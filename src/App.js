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

        // Check if the fetched data is an array
        if (Array.isArray(data)) {
          // Shuffle the questions array
          const shuffledQuestions = shuffleArray(data);
          // Use the sampleQuestions function to select a random subset (e.g., 5 questions)
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

  }, []); // Empty dependency array since fetchQuestions does not depend on any variable outside its scope

  const handleNextQuestion = () => {
    // Increment the question index
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleAnswerSelected = (choice) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = choice === currentQuestion.correctAnswer;

    // Update the score based on correctness (2 points for each correct answer)
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));

    formik.handleChange({
      target: {
        name: `answers.${currentQuestion.id}`,
        value: choice,
      },
    });
  };

  const handlePrevQuestion = () => {
    // Decrement the question index
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    console.log('Updated Questions:', questions);
    console.log('Updated Formik Values:', formik.values);
  }, [questions, formik.values]);
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
                  setQuestions={setQuestions} // Make sure to pass setQuestions as a prop
                  formik={formik}
                  currentQuestionIndex={currentQuestionIndex}
                  onNext={handleNextQuestion}
                  onPrev={handlePrevQuestion}
                  onAnswerSelected={handleAnswerSelected}
                />
              ) : (
                <p>No questions available.</p>
              )
            }
          />

          <Route path="/score" element={<Score score={score} questions={questions} />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* Add a route for the root path if needed */}
          <Route path="/" element={<p>Welcome to the Quiz App!</p>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
