import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from './Timer';
import Question from './Question';
import Results from './Results';
import examsData from '../exams.json';

import { Modal, Button } from 'react-bootstrap'; // Import react-bootstrap components
import '../styles/App.css';

const Exam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = examsData.exams.find((exam) => exam.id === parseInt(examId));
  const questions = exam ? exam.questions : [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

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
      setShowModal(true); // Show the modal
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

  const handleBackToHome = () => {
    navigate('/');
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
        <button onClick={handleBackToHome} className="back-to-home">
          الصفحه الرئيسيه
        </button>
      </div>

      {/* React-Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تنبيه</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          لديك اساله لم تتم الاجابه عليها:{' '}
          {userAnswers
            .map((answer, index) => (answer === null ? index + 1 : null))
            .filter((questionNumber) => questionNumber !== null)
            .join(', ')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            راجع الاساله
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Exam;