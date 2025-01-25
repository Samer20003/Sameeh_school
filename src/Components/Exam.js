import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Timer from './Timer';
import Question from './Question';
import Results from './Results';
import examsData from '../exams.json';
import '../styles/App.css';

const Exam = () => {
  const { examId } = useParams(); // Get the exam ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const exam = examsData.exams.find((exam) => exam.id === parseInt(examId));
  const questions = exam ? exam.questions : [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const unansweredQuestions = userAnswers
      .map((answer, index) => (answer === null ? index + 1 : null))
      .filter((questionNumber) => questionNumber !== null);

    if (unansweredQuestions.length > 0) {
      alert(`لديك اساله لم تتم الاجابه عليها ${unansweredQuestions.join(', ')}`);
      return;
    }

    setIsSubmitted(true);
  };

  const handleTimeUp = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(null));
    setIsSubmitted(false);
  };

  // Function to handle going back to the homepage
  const handleBackToHome = () => {
    navigate('/'); // Navigate to the homepage
  };

  if (isSubmitted) {
    return (
      <Results
        questions={questions}
        userAnswers={userAnswers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="app">
      <div className="main-content">
        <Timer onTimeUp={handleTimeUp} />
        <div className="question-counter">
          السؤال {currentQuestionIndex + 1} of {questions.length}
        </div>
        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          selectedOption={userAnswers[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
        <div className="navigation">
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            السابق
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            التالي
          </button>
          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={handleSubmit}>تقدم</button>
          )}
        </div>
        {/* Add the "Back to Home" button */}
        <button onClick={handleBackToHome} className="back-to-home">
          الصفحه الرئيسيه
        </button>
      </div>
    </div>
  );
};

export default Exam;